import Promised from "../../../Arch/Promised"
import * as Common from "../../../Common";
import UUID from "../../../Browser/UUID";

export default class Ad extends Promised
{
    static get EVENT_AD_AVAILABLE(){return 1;}
    static get EVENT_AD_EMPTY()    { return 2;}
    static get EVENT_VISIBILITY_CHANGE() {return 3;}
    static get EVENT_SLOT_VISIBLE() {return  4;}
    static get EVENT_AD_ERROR() {return 5;}
    static get EVENT_AD_FINISHED() {return 6;}
    static get EVENT_AD_REQUESTED() {return 7;}
    static get EVENT_AD_PAUSED() {return 8;}
    static get EVENT_AD_RESUMED() {return 9;}
    static get EVENT_AD_FIRST_QUARTILE() {return 10;}
    static get EVENT_AD_MIDPOINT() {return 11;}
    static get EVENT_AD_THIRD_QUARTILE() {return 12;}
    static get EVENT_AD_VIEWTHRU() { return 13;}
    static get EVENT_AD_CLICKED() {return 14;}

    static get STATE_CREATED() {return "Created";}
    static get STATE_AVAILABLE() {return "Available";}
    static get STATE_CONFIGURING() {return "Configuring";}
    static get STATE_READY() {return "Ready";}

    static get STATE_REQUESTING() {return "Requesting";}
    static get STATE_LOADED() {return "Loaded";}
    static get STATE_DISPLAYED() {return "Displayed";}
    static get STATE_IMPRESSION(){return "Impression";}
    static get STATE_IDLE() {return "Idle";}
    static get STATE_DESTROYED(){return "Destroyed";}


    constructor(serviceContainer,adController,slotId,slotConfig,config)
    {
        super(serviceContainer);

        this.id=UUID();
        this.slotId=slotId;
        this.logger=serviceContainer.get("Log");
        this.logger.debug("Creando anuncio");
        this.config=config;
        this.adConfig=slotConfig.ad;
        this.container=null;
        this.adService=serviceContainer.get(this.getServiceName());
        this.behaviours={};
        this.serviceContainer=serviceContainer;
        this.request=null;
        this.empty=null;
        this.sizeMapping=null;
        this.adController=adController;
    }

    initialize()
    {
        this.prependPromises({
            //"attached":   this.isPrefetching()?Ad.STATE_DISPLAYED:Ad.STATE_READY,
                "attached":   this.isPrefetching()?Ad.STATE_DISPLAYED:Ad.STATE_CONFIGURING,
            "loaded":     Ad.STATE_LOADED,
            "destroyed":  Ad.STATE_DESTROYED,
            "displayed":  Ad.STATE_DISPLAYED,
            "impression": Ad.STATE_IMPRESSION,
            "available": Ad.STATE_AVAILABLE,
        //    "ready":      Ad.STATE_READY
        }
        );
        this.before("Created").wait(this.adService.isInState("Configured"));

        this.run([Ad.STATE_CREATED,Ad.STATE_AVAILABLE,Ad.STATE_CONFIGURING, Ad.STATE_READY,Ad.STATE_REQUESTING,
                  Ad.STATE_LOADED, Ad.STATE_DISPLAYED, Ad.STATE_IMPRESSION, Ad.STATE_IDLE,
                  Ad.STATE_DESTROYED
            ]);
    }

    // Created se dispara cuando hay un ad potencialmente disparable.Aun no se sabe si esta enabled o no.
    onCreated(){
        if(this.config["slots"][this.slotId].enabled) {

            this.resolve("available");
        }
    }

    attach(container)
    {
        this.container=container;
        container.isInState("Attached").then(()=>{

            this.debug("AD_ATTACHED");
            this.resolve("attached");
        });
    }


    // Configuring se dispara cuando el ad esta configurado a nivel de tamanios, targeting,etc
    onConfiguring(){

        this.adService.configureAd(this);
        if(this.adConfig.behaviours!==undefined)
        {
            for(let k in this.adConfig.behaviours)
            {
                let i=this.adConfig.behaviours[k];
                let newI=new i.type(this.serviceContainer,this,i.config);
                this.before("Ready").wait(newI.isInState("Ready"));
                newI.initialize();
                this.behaviours[k]=newI;
            }
        }
        this.container.setAdConfigured();
    }
    // Ready se dispara cuando las dependencias internas, y de los behaviours, estan listas.
    onReady(){
        this.debug("AD_READY");
    }
    // Requested se dispara cuando se realiza la peticion de anuncio al backend
    onRequesting()
    {
        this.currentRequest=this.adService.requestAd(this);
        this.currentRequest.id=this.id;
    }
    setEmpty()
    {
        this.gotoState("Idle");
    }
    setLoaded()
    {
        this.resolve("loaded");
    }
    onLoaded()
    {
        this.debug("AD_LOADED");
        this.adService.displayAd(this);
    }

    setDisplayed()
    {
        this.resolve("displayed");
    }
    // Displayed se dispara cuando el anuncio ha terminado de mostrarse
    onDisplayed(){
        this.debug("AD_DISPLAYED");
    }
    gotImpression()
    {
        this.resolve("impression");
    }
    // Impression se dispara cuando el anuncio ha dado impresion
    onImpression(){
        this.debug("AD_IMPRESSION");
    }
    // Destroyed es disparado cuando el anuncio es destruido desde fuera
    onIdle(){
        this.debug("AD_IDLE");
    }
    destroy()
    {
        this.resolve("destroyed");
    }
    onDestroyed()
    {
        for(let k in this.behaviours)
        {
            this.behaviours[k].destroy();
        }
        this.debug("AD_DESTROYED");
    }

    /**
     *     UTILITY METHODS
     */

    isPrefetching()
    {
        return this.adConfig.prefetch || false;
    }
    getServiceName()
    {
        return this.adConfig.adProvider;
    }
    getServiceParam(service,param)
    {
        if(this.adConfig[service]===undefined)
            return null;
        if(param===undefined)
            return this.adConfig[service];

        return (this.adConfig[service][param]!==undefined)?this.adConfig[service][param]:null;
    }
    getTargeting()
    {
        return {
            "adId":this.id
        }
    }
    getSizes()
    {
        return this.adConfig.sizes===undefined?[]:this.adConfig.sizes;
    }
    getContainer()
    {
        return this.container;
    }
    getBehaviour(beh)
    {
        if(this.adConfig.behaviours===undefined)
            return null;
        if(this.adConfig.behaviours[beh]===undefined)
            return null;
        return this.adConfig.behaviours[beh].config;
    }
    getCurrentRequest()
    {
        return this.currentRequest;
    }
    isEmpty()
    {
        return this.empty;
    }
    setErrored(code)
    {
        this.errored=true;
    }
    debug(str)
    {
        console.log("[AD "+this.id+"]:"+str);
    }
    reload()
    {
        this.adController.reloadAd();
    }
    getController()
    {
        return this.adController;
    }

    getLabel(){return "Ad"}

    getAdService()
    {
        return this.adService;
    }
    getNativeSlot()
    {
        return this.adService.getNativeSlot(this);
    }
    setSizeMapping(mapping)
    {
        this.sizeMapping=mapping;
    }


}
