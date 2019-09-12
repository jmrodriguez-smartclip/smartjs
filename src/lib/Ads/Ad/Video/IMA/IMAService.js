import AdService from "../../Base/AdService"
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise"
import IMARequest from "./IMARequest";
import DivNode from "../../../Container/lib/DivNode"
/*
    Tenemos 3 objetos a gestionar:
    adsLoader
    adDisplayContainer
    adsManager

 */
export default class IMAService extends AdService {
    initialize()
    {
        this.adsManager=null;
        this.divOverlay=null;
        super.initialize();
    }
    onCreated()
    {
        Network.loadDependencies({
            css:[
                "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/sc_player/dependencies/css/videojs.ads.css",
                "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/sc_player/dependencies/css/videojs.ima.css",
                "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/sc_player/dependencies/css/style.css"
            ],
            scripts:[
                "//imasdk.googleapis.com/js/sdkloader/ima3.js"
            ]
        }).then(()=>{

            this.resolve("loaded");
        })
    }
    onInitialized() {

    }

    onConfigured() {

    }

    onReady() {
    }

    configureAd(ad) {
        ad.getContainer().addBehaviour(
            {type:"Videojs",value:{}}
        );
    }
    requestAd(ad)
    {

        let r = this.createRequest(ad);
        let adNode=ad.getContainer().getNode();
        let adId=adNode.getId();
        if(this.currentContainerId===adId)
        {
            // Todo
            // Pedir uno nuevo
        }
        else
        {
            if(this.adsManager!==null)
            {
                this.adsManager.destroy();
                this.adsManager=null;
                this.divOverlay=null;
            }
        }
        if(this.divOverlay===null)
        {
            let parent=adNode;
            let newDiv1=new DivNode({tag:"div",parent:parent});
            newDiv1.applyStyles({"position":"relative"});
            let newDiv2=new DivNode({tag:"div",parent:newDiv1});
            newDiv2.applyStyles({position:"absolute",top:"0px",left:"0px"});
            this.divOverlay=newDiv2;
        }
        this.currentAd=ad;


        this.displayContainer = new google.ima.AdDisplayContainer(
            this.divOverlay.getNode(), adNode.getNode());

        // Initialize the container. Must be done via a user action on mobile devices.
        this.displayContainer.initialize();


        // Create ads loader.
        let adsLoader = new google.ima.AdsLoader(this.displayContainer);

        // Set VPAID Mode to Enabled
        adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
        adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE);

        // Listen and respond to ads loaded and error events.
        adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            (e)=>{this.onAdsManagerLoaded(ad,e)},
            false);
        adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            ()=>{this.onAdsError();},
            false);

        // Request video ads.
        let adsRequest = new google.ima.AdsRequest();

        // autoplay ad
        adsRequest.setAdWillAutoPlay(true);

        adsRequest.adTagUrl = this.getVastUrl(ad);
        let sizes=ad.getSizes();
        // Specify the linear and nonlinear slot sizes. This helps the SDK to
        // select the correct creative if multiple are returned.
        adsRequest.linearAdSlotWidth = sizes[0][0];
        adsRequest.linearAdSlotHeight = sizes[0][1];
        r.onRequested(null);
        adsLoader.requestAds(adsRequest);
        return r;


    }


    onAdsManagerLoaded(ad,adsManagerLoadedEvent)
    {
     //   ad.getContainer().getNode().getNode().load();

        let player=ad.getContainer().getBehaviour("Videojs").getPlayer().getVideoElement();

        let adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

        // videoContent should be set to the content video element.
        let adsManager = adsManagerLoadedEvent.getAdsManager(
                player, adsRenderingSettings);
        this.adsManager=adsManager;
        this.initializeEvents(ad);
        try {
            // Initialize the ads manager. Ad rules playlist will start at this time.
            let sizes=ad.getSizes();
            adsManager.init(sizes[0][0], sizes[0][1], google.ima.ViewMode.NORMAL);
            // Call play to start showing the ad. Single video and overlay ads will
            // start at this time; the call will be ignored for ad rules.
            ad.setLoaded();
       //     ad.getCurrentRequest().onLoaded(null);

        } catch (adError) {
            // An error may be thrown if there was a problem with the VAST response.
            player.play();
        }

    }
    displayAd(ad)
    {

        ad.getCurrentRequest().onRequested();
        this.adsManager.start();
    }


    getVastUrl(ad)
    {
        let adServerParam=ad.getServiceParam("IMA","adserver");
        let service=this.serviceContainer.get("VideoAdServer");
        let adServer=service.getAdServer(adServerParam);
        return adServer.getVastUrl(ad,ad.getContainer().getBehaviour("Videojs").getPlayer().getVideoElement());
    }

    getTagName() {
        return "IMA";
    }
    createRequest(ad)
    {
        return new IMARequest(this.serviceContainer,ad,this);
    }
    initializeEvents(ad)
    {
        let adsManager=this.adsManager;

        // Add listeners to the required events.
        adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            (e)=>{
                const err = e.getError()

                if (adsManager) {
                    adsManager.destroy()
                    this.adsManager=null;
                }
                if (err.getType() === google.ima.AdError.Type.AD_LOAD) {
                    target.classList.remove(CLASSNAME_LOADING)
                }
                ad.getCurrentRequest().onError(google.ima.AdError.Type,google.ima.AdError.toString())
                this.resumeContent(ad);
            });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            function(e){
                ad.getCurrentRequest().onPause();
                });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            function(e){
                ad.getCurrentRequest().onResume();
                });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            function(e){
                ad.getCurrentRequest().onFinished();
                });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.CLICK,
            function(e){
                ad.getCurrentRequest().onClick()});

        // Listen to any additional events, if necessary.
        adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            function(e){
                ad.getCurrentRequest().onAdReceived()
                console.dir(e);});
        adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            function(e){
                ad.getCurrentRequest().onStart()
                });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            function(e){
                ad.getCurrentRequest().onViewThru();
            });
        adsManager.addEventListener(
            google.ima.AdEvent.Type.FIRST_QUARTILE,
            function(e){
                ad.getCurrentRequest().onFirstQuartile()});
        adsManager.addEventListener(
            google.ima.AdEvent.Type.MIDPOINT,
            function(e){
                ad.getCurrentRequest().onMidPoint()});
        adsManager.addEventListener(
            google.ima.AdEvent.Type.THIRD_QUARTILE,
            function(e){
                ad.getCurrentRequest().onThirdQuartile()});

    }
    resumeContent(ad)
    {
        let player=ad.getContainer().getBehaviour("Videojs").getPlayer().getVideoElement();
        player.controls=true;
        player.play();
    }
    getLabel()
    {
        return "IMAService";
    }
}

