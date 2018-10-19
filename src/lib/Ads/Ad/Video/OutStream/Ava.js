import AdService from "../../Base/AdService";
import * as Network from "../../../../Network"

export default class Ava extends AdService
{
    onInitialized(){

    }
    onConfigured(){
    }
    onReady(){}

    onEvent(id,slot,message) {
    }
    requestAd(ad)
    {

    }
    configureAd(ad)
    {
        top.Site_conf=ad.getServiceParam("Ava");
        ad.before("Requesting").wait(
            Network.asyncLoad("https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/ava/ava.js")
        );
    }

}
/*
SmartAva = {
    config: {
        siteConfPath: "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/ava/config/",
        smartclipConfig: "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/HeaderBidding/js/SmartclipConfig.js",
        js_dependencies: ["https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"],
        pixels: [
            {
                "name": "generic1",
                "url": "//smx-stats.smartclipconfig.com/Transparent1.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic2",
                "url": "//smx-stats.smartclipconfig.com/Transparent2.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic3",
                "url": "//smx-stats.smartclipconfig.com/Transparent3.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic4",
                "url": "//smx-stats.smartclipconfig.com/Transparent4.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic5",
                "url": "//smx-stats.smartclipconfig.com/Transparent5.gif?player_id=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "generic6",
                "url": "//smx-stats.smartclipconfig.com/Transparent6.gif?player_id=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "generic7",
                "url": "//smx-stats.smartclipconfig.com/Transparent7.gif?player_id=",
                "event": ["complete"],
                "needPlayerId": true
            },
            {
                "name": "generic8",
                "url": "//smx-stats.smartclipconfig.com/Transparent8.gif?player_id=",
                "event": ["complete"],
                "needPlayerId": true
            },
            {
                "name": "genericBR1",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR1.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericBR2",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR2.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericBR3",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR3.gif?player_id=",
                "event": ["noAd"],
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM1",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX1.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM2",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX2.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM3",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX3.gif?player_id=",
                "event": ["noAd"],
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "bluekai",
                "url": "//tags.bluekai.com/site/47890?ret=js&limit=1&phint=sc_videosite%3D",
                "needPlayerId": true
            },
            {
                "name": "comscoreImpression",
                "url": "//smx-stats.smartclipconfig.com/Csi.gif?guid="+ getGuid()+ "&playerId=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "sc_DV360",
                "url": "//ad.sxp.smartclip.net/sync?type=red&dsp=10",
                "event": ["noAd"],
                "country": ["ar", "br", "co", "ec", "mx", "pe", "us"],
                "frequency": [1, 720]
            },
            {
                "name": "sc_MediaMath",
                "url": "//ad.sxp.smartclip.net/sync?type=red&dsp=40",
                "event": ["noAd"],
                "country": ["ar", "br", "co", "ec", "mx", "pe", "us"],
                "frequency": [1, 720]
            },
            {
                "name": "uniqueUserApnx",
                "url": "https://secure.adnxs.com/seg?add=14832416&t=2",
                "country" : ["es"]
            }
        ]
    },
    utils: {
        ava_sc_smartIntxtStart: function(container) {

            SmartAva.utils.showElement(container);
            if (Ava_conf.hardSkip && Ava_conf.hardSkip != 0) {
                SmartAva.utils.addSkipButton(Ava_conf.hardSkip, container,SmartAva.utils.ava_sc_smartIntxtEnd)
            }
        },

        ava_sc_smartIntxtEnd: function() {

            if (Ava_conf.nonstop) {
                if (typeof top.sc_intext_cont == "undefined") {
                    top.sc_intext_cont = 0;
                }
                var reference = "smartIntxt" + top.sc_intext_cont;
                SmartAva.utils.removeFixedClasses(Ava_conf.fixedClass);
                top.sc_intext_cont++;
                var ref_element = '<div id="' + reference + '" class = "' + Ava_conf.fixedClass + '" ></div>';
                top.avaContainerElement.insertAdjacentHTML('beforebegin', ref_element);
                SmartAva.init(VideoManager.ava.getElementIdCrossFrames(reference), Ava_conf);
            }else{
                SmartAva.utils.hideElement(SmartIntxt.config.elementContainer);
            }

        },
        intxt_sc_smartIntxtStart : function(container){
            try {
                sc_smartIntxtStart();
            } catch(e) {
                console.log(e);
            }
            if (!container.id) container = VideoManager.ava.getElementIdCrossFrames(container);
            var intxtConf = top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"];
            if (typeof(intxtConf) != "undefined" && intxtConf.hardSkip != 0) {
                SmartAva.utils.addSkipButton(intxtConf.hardSkip, container,function (){SmartAva.utils.intxt_sc_smartIntxtEnd(container)})
            }
        },

        intxt_sc_smartIntxtEnd: function(container){
            try {
                sc_smartIntxtEnd()
            } catch(e) {
                console.log(e);
            }
            if (!container.id) container = VideoManager.ava.getElementIdCrossFrames(container);
            var intxtConf = top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"];
            if (typeof(intxtConf) != "undefined" && intxtConf.nonstop) {
                if (typeof top.sc_intext_cont == "undefined") {
                    top.sc_intext_cont = 0;
                }
                var reference = container.id + top.sc_intext_cont;
                top.sc_intext_cont++;
                var ref_element = '<div id="' + reference + '" ></div>';
                container.insertAdjacentHTML('beforebegin', ref_element);
                SmartAva.utils.startSmartIntext(reference,"intxt")
            }

        },
        hideElement: function (target){ //TEST if is still needed
            var element;
            VideoManager.ava.getElementIdCrossFrames(target.id) ? element = VideoManager.ava.getElementIdCrossFrames(target.id) : element = VideoManager.ava.getElementIdCrossFrames(SmartIntxt.config.elementContainer);
            element.style.display = 'none';
        },
        showElement: function (target){ //searches element by id and html node

            var element;
            target.id ? element = VideoManager.ava.getElementIdCrossFrames(target.id) : element = VideoManager.ava.getElementIdCrossFrames(target);
            element.style.opacity = "1";
            element.style.display = 'block'
        },

        getPlayerConfig : function (format){
            var response = {};
            var Ava_conf = VideoManager.ava.loadAvaConfDevice();
            var Inphoto_conf = top.Site_conf.inphoto[SmartAva.utils.isMobile() ? "mobile" : "web"];
            var intxt_conf = this.getIntxtConfig();


            switch (format) {
                case "ava":
                    response.playerId = Ava_conf.smaracd_player;
                    Ava_conf.placement ? response.plc = Ava_conf.placement : response.plc ="";
                    response.skipOffset = Ava_conf.skipOffset;
                    response.skipText = Ava_conf.skipText;
                    break;
            }
            return response
        },
        removeFixedClasses: function(patern) {
            var elements = top.document.getElementsByClassName(patern);
            for (i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.classList.remove(patern);
                element.style.display = "none";
            }
        },
        createPositionReference: function(target) {

            if (typeof intext_element == "undefined") {
                if (!document.getElementById(target)) {
                    intext_element = top.document.getElementById(target);
                    setTimeout(function() {
                        SmartAva.utils.createPositionReference(target);
                    }, 100); //BLOCKED, smartIntxt element is not being created :-O
                } else {
                    intext_element = document.getElementById(target);
                }
            }
            var elementName = "sc-ava-" + Math.round(Math.random() * 1e8);
            var ref_element = '<div id="' + elementName + '"></div>';
            intext_element.insertAdjacentHTML('beforebegin', ref_element);
            return elementName;
        },

        resizeIntextIframe: function() {
            var iframe = document.getElementById(SmartIntxt.config.elementContainer + "-frame");
            if (!iframe) {
                iframe = top.document.getElementById(SmartIntxt.config.elementContainer + "-frame");
            }
            if (iframe) {
                var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                var vpaid_container = innerDoc.querySelectorAll("div[id*=vpaidSlot]");
                var videos = innerDoc.getElementsByTagName("video");
                var styles = {
                    height: "100%",
                    width: "100%"
                };
                if (vpaid_container && iframe) {
                    for (var i = 0; i < vpaid_container.length; i++) {
                        top.smartclipJquery(vpaid_container[i]).css(styles);
                        for (b = 0; vpaid_container[i].children.length > b; b++) {
                            top.smartclipJquery(vpaid_container[i].children[b]).css(styles);
                            for (var a = 0; a < vpaid_container[i].children[b].children.length; a++) {
                                top.smartclipJquery(vpaid_container[i].children[b].children[a]).css(styles);
                            }
                        }
                    }
                    var iframes = innerDoc.getElementsByTagName("iframe");
                    for (var i = 0; i < iframes.length; i++) {
                        top.smartclipJquery(iframes[i]).css(styles);
                    }

                }
            }
        },
        managePlayerPosition: function(containerReferencePosition, container, movePlayerTimes, alwaysVisible, Ava_conf, containerElementIsFormatted) {
            var result = {
                movePlayerTimes: movePlayerTimes,
                inView: null
            }
            if (movePlayerTimes < Ava_conf.movePlayerCap || Ava_conf.movePlayerCap == 0) {
                var refTop = top.smartclipJquery("#" + containerReferencePosition).offset().top; //Pixels from elementÃ‚Â´s top to top of document
                var refBot = refTop + top.smartclipJquery("#" + containerReferencePosition).width() / 16 * 9; //Pixels from elementÃ‚Â´s bottom to top of document
                SmartAva.utils.resizeIntextIframe();

                if (SmartAva.utils.isInview(refTop, refBot, Ava_conf.margin_bot, Ava_conf.margin_top)) {
                    result.inView = true;
                    if (alwaysVisible) {
                        //if(this.isFixed())
                        if (typeof container.classList != 'undefined' && container.classList.value == Ava_conf.fixedClass) { //TODO  poner nombres coherentes a esto

                            container.classList.remove(Ava_conf.fixedClass);
                            result.movePlayerTimes++;
                        }

                    } else {
                        //When initiated not fixed...

                        SmartAva.utils.startCallback(container);
                    }
                } else {
                    result.inView = false;
                    if (typeof container.classList == 'undefined' || container.classList == "" && alwaysVisible) {
                        SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                        result.movePlayerTimes++;
                    }
                }
            }
            return result;
        },

    init: function(container, Ava_conf) {
        var containerElementIsFormatted = false;
        if (typeof top.jQuery != "undefined") {
            top.smartclipJquery = top.jQuery;
            var containerPositionReference = SmartAva.utils.createPositionReference(container.id);
            if (Ava_conf.initFixed && !Ava_conf.onscroll) {
                SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                containerElementIsFormatted = true;
            }
            var movePlayerTimes = 0;
            if (Ava_conf.initFixed) {
                if (!Ava_conf.keepFixed) {

                    top.smartclipJquery(top.window).scroll(function() { // Warning pending remove listener on end.

                        if (!containerElementIsFormatted) {
                            SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                            containerElementIsFormatted = true;

                        }
                        var ManageResult = SmartAva.utils.managePlayerPosition(containerPositionReference, container, movePlayerTimes, true, Ava_conf, containerElementIsFormatted); //pass AVA element
                        containerElementIsFormatted = true
                        movePlayerTimes = ManageResult.movePlayerTimes;

                    });
                } else {
                    SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);

                }
            } else {
                var alwaysVisible = false
                top.smartclipJquery(top.window).scroll(function() { // Warning pending remove listener on end.
                    var ManageResult = SmartAva.utils.managePlayerPosition(containerPositionReference, container, movePlayerTimes, alwaysVisible, Ava_conf, containerElementIsFormatted); //pass AVA element
                    if (ManageResult.inView) {
                        alwaysVisible = true;
                        containerElementIsFormatted = true
                    }

                    movePlayerTimes = ManageResult.movePlayerTimes;
                });

            }


        } else {
            if (typeof jQuery == "undefined") {
                SmartAva.utils.loadJsResources(SmartAva.config.js_dependencies); //LOAD JQUERY ONNLY
                setTimeout(function() {
                    SmartAva.init(container, Ava_conf);
                }, 200);
            }
        }
    }
};


VideoManager = {
    ava: {

        createAvaContainerAndStart: function(Ava_conf) {
            if (SmartIntxt.config.elementContainer == "") {
                var elementContainer = VideoManager.ava.getContainerElement();
                if (typeof elementContainer != "undefined") { //Create an element on Document where element locator did.... Then we use it as AVA container
                    elementContainer.innerHTML = "";
                    elementContainer.style = "";
                    var mandanga = '<div id="sc_smartAva"></div>';
                    elementContainer.insertAdjacentHTML("beforebegin", mandanga);
                    SmartIntxt.config.elementContainer = "sc_smartAva";

                    elementContainer = VideoManager.ava.getElementIdCrossFrames("sc_smartAva");

                    delete SmartPlay;

                } else {
                    setTimeout(function() {
                        VideoManager.ava.createAvaContainerAndStart(Ava_conf);
                    }, 200);
                }
            } else {
                elementContainer = VideoManager.ava.getElementIdCrossFrames(SmartIntxt.config.elementContainer);

                //TODO Test pretty well elementcontainer name is returned

            }
            if (typeof elementContainer != "undefined") {
                VideoManager.ava.ready(elementContainer, Ava_conf);
            } else {

            }

        },
        getContainerElement: function() {

            var a = VideoManager.ava.getElementsCrossFrames("div[id*=sc-]");
            var result;

            a.forEach(function(a) {
                if (a.id.indexOf("-backdrop") >= 0) {
                    result = a.parentElement;

                }
            });
            return result;
        },

        prepareDocumentForAva: function(Ava_conf) {
            VideoManager.ava.loadCssResources(Ava_conf);
            if (SmartIntxt.config.elementContainer == "") {
                SmartIntxt.init(); //Init intext so elements are included on page
            }
        },

        init: function() {
            top.SmartAva = SmartAva; // creating global object for external connections
            if (typeof avaConfRequested == 'undefined' || typeof top.Site_conf == 'undefined') { //conf is loadeed?
                VideoManager.ava.loadAvaConf();
                setTimeout(function() {
                    VideoManager.ava.init()
                }, 200);

            } else {

                var Ava_conf = VideoManager.ava.loadAvaConfDevice();
                Site_conf = top.Site_conf;
                VideoManager.ava.executeIntxtContainerPositioning();
                if (VideoManager.ava.discardAva(Ava_conf)) { //no Ava, regular
                    Site_conf = top.Site_conf;
                    //SmartIntxt.init();

                    SmartAva.utils.startSmartIntext(SmartIntxt.config.elementContainer,"intxt")
                    traditionalIntext = true;


                } else {
                    traditionalIntext = false
                    VideoManager.ava.prepareDocumentForAva(Ava_conf);
                    VideoManager.ava.createAvaContainerAndStart(Ava_conf);

                }




            }

        }
    }
};


VideoManager.ava.init();
VideoManager.inphoto.init();

 */