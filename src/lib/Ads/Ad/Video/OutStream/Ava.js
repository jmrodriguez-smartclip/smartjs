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
            VideoManager.ava.videoAdStarted();
            var Ava_conf = VideoManager.ava.loadAvaConfDevice();
            if (Ava_conf.hardSkip && Ava_conf.hardSkip != 0) {
                SmartAva.utils.addSkipButton(Ava_conf.hardSkip, container,SmartAva.utils.ava_sc_smartIntxtEnd)
            }
        },
        ava_sc_smartIntxtNoad: function() {
            SmartAva.utils.hideElement(SmartIntxt.config.elementContainer);
            VideoManager.ava.videoAdEmpty();
        },
        ava_sc_smartIntxtEnd: function() {
            VideoManager.ava.videoAdEnded();
            var Ava_conf = VideoManager.ava.loadAvaConfDevice();

            //SmartInphoto.utils.intxtEnd();
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
        intxt_sc_smartIntxtNoad: function(){
            sc_smartIntxtNoad()
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
        startScPlayer: function(container){
            if (container.id) container = container.id;
            var sc_settings = {
                pc_player_id : VideoManager.ava.getIntxtPlayerId(),
                container : container,
                autoplay: true,
                muted: true,
                controls: false,
                startAd: function(){
                    SmartAva.utils.ava_sc_smartIntxtStart(container);
                    try {

                        sc_smartIntxtStart(container);
                    } catch(e) {
                        // statements
                        console.log(e);
                    }

                },
                endAd : function(){
                    SmartAva.utils.ava_sc_smartIntxtEnd(container);

                    try {
                        sc_smartIntxtEnd();
                    } catch(e) {
                        // statements
                        console.log(e);
                    }

                }
            };
            var sc_preroll = document.createElement("script");
            sc_preroll.src="https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/sc_player/containerv2.js";
            sc_preroll.onload=function(){

                Sc_video_container.init(sc_settings);
            };
            document.body.appendChild(sc_preroll);
        },
        startSmartIntext: function(container,format) {
            var status = SmartAva.utils.getClientStatus();
            var userCompleteProb = SmartAva.utils.getUserCompleteProb();
            if (typeof SmartIntxt.config.placement == "undefined") SmartIntxt.config.placement = "";
            var PlayerConfig = this.getPlayerConfig(format);

            var endingScreen = format == "intxt" ? true : false;

            var sc_ref = encodeURIComponent(window.location.href);
            var sc = document.createElement('script');
            sc.type = 'text/javascript';
            sc.async = 'true';
            sc.src = '//dco.smartclip.net/?plc=';
            sc.onload = sc.onreadystatechange = function() {
                var rs = this.readyState;
                if (rs && rs != 'complete' && rs != 'loaded') return;
                try {
                    SmartPlay(container, {
                        adRequest: '//ad.sxp.smartclip.net/select?type=dyn&ple=' + PlayerConfig.playerId + '~' + PlayerConfig.plc + '~400x320&cu_smar_cors=1&smar_cors=1&fwd_d1=' + status + '&ang_ref=' + sc_ref + '&fwd_d2='+ userCompleteProb + '&fwd_dt2=&fwd_sz=400x320&&ang_contxt=1&inswipe=[ALLOWINSWIPE]&optout=&consent=&rnd=' + Math.round(Math.random() * 1e8),
                        minAdWidth: 190,
                        maxAdWidth: 1700,
                        elementLocator: {
                            allowInViewport: false,
                            minimumElementWidth: 320,
                            scanPixelsBelowViewport: 800
                        },
                        skipText: PlayerConfig.skipText,
                        skipOffset: PlayerConfig.skipOffset, // overriden by VAST3 skipoffset, value of 0 will not show a skip button 0.1 will immediately show a ckip button
                        featureMatrix: {
                            endingScreen: {
                                enabled: endingScreen
                            }
                        },
                        behaviourMatrix: {
                            'offScreen': {
                                paused: false,
                                muted: true
                            },
                            'mouseOver': {
                                muted: true
                            },
                            'onClick': {
                                muted: false
                            }
                        },
                        onStartCallback: (function() {
                            try {
                                SmartAva.utils.fireDataPixels("start");
                                if (format == "ava") SmartAva.utils.ava_sc_smartIntxtStart(container);
                                if (format == "intxt") SmartAva.utils.intxt_sc_smartIntxtStart(container);
                            } catch (f) {console.warn('error caught : ' + f);}
                        }),
                        onCappedCallback: (function() {
                            try {
                                SmartAva.utils.fireDataPixels("noAd");
                                if (format == "ava") SmartAva.utils.ava_sc_smartIntxtNoad();
                                if (format == "intxt") SmartAva.utils.intxt_sc_smartIntxtNoad(container);
                            } catch (f) {console.warn('error caught : ' + f);}
                        }),
                        onEndCallback: (function() {
                            try {
                                SmartAva.utils.fireDataPixels("complete");
                                if (format == "ava") SmartAva.utils.ava_sc_smartIntxtEnd(container);
                                if (format == "intxt") SmartAva.utils.intxt_sc_smartIntxtEnd(container);
                            } catch (f) {console.warn('error caught : ' + f);}
                        })
                    });
                } catch (e) {
                    console.warn('error caught : ' + e);
                }
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(sc, s);
        },
        getIntxtConfig: function(){

            if (typeof top.Site_conf.intxt !="undefined") {
                if (typeof top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"] != "undefined"){
                    var confFile= top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"];
                }
            }
            if (!confFile){
                confFile = {
                    smaracd_player : SmartIntxt.config.playerHTML5,
                    placement : SmartIntxt.config.placement,
                    skipOffset : '0',
                    skipText : ''
                }
            }
            if (!confFile.placement) confFile.placement="";
            return confFile;
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
                case "intxt":
                    response.playerId = intxt_conf.smaracd_player;
                    response.plc = intxt_conf.placement;
                    response.skipOffset = intxt_conf.skipOffset;
                    response.skipText = intxt_conf.skipText;
                    break;
                case "inphoto":
                    response.playerId = Inphoto_conf.smaracd_player;
                    if (Inphoto_conf.placement) response.plc = Inphoto_conf.placement;
                    Inphoto_conf.placement ? response.plc = Inphoto_conf.placement : response.plc ="";
                    response.skipOffset = Inphoto_conf.skipOffset;
                    response.skipText = Inphoto_conf.skipText;
                    break;
                default:
                    console.log("error creating smartX ad request. No adFormat provided")
                    break;
            }
            return response
        },
        addSkipButton: function(secs, element,callback) {

            if(!element.id){
                element = document.getElementById(element)
            }
            var sc_iframe = document.getElementById(element.id + '-frame').contentWindow.document;
            setTimeout(function() {
                sc_iframe.getElementById("skipbar").remove();
                var pepe = sc_iframe.getElementById("player-ui");
                pepe.insertAdjacentHTML("beforeend", '<div id="skipbar" style="z-index:15000000"class="front-hl-color"><div style="display: table-row;z-index:15000000"><div id="skip" class="button back-color front-hl-color active enabled" data-bind="click: skip"><div data-bind="innerHTML: skipText" innerhtml=""></div><div class="wrapper"><span class="skip-close scmp-plus rotate-45"></span><canvas width="28" height="28" class="skip-countdown enabled"></canvas></div></div><div id="play-ios" class="button back-color" data-bind="click: togglePlay"><div><span class="scmp-play"></span></div></div><div class="button click-through back-color" data-bind="click: triggerClickThrough"><div><span class="scmp-web"></span></div></div></div></div>');
                sc_iframe.getElementById("skip").addEventListener("click", myFunction);

                function myFunction() {
                    top.document.getElementById(element.id).style.height = "0px";
                    top.document.getElementById(element.id + "-frame").style.height = "0px";
                    setTimeout(function() {
                        top.document.getElementById(element.id + "-frame").remove();
                        callback();

                    }, 1000);
                }
            }, secs * 1000)

        },
        removeFixedClasses: function(patern) {
            var elements = top.document.getElementsByClassName(patern);
            for (i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.classList.remove(patern);
                element.style.display = "none";

            }

        },
        getNetworkSpeed: function (){
            var perfData = window.performance.timing;
            var connectTime = perfData.responseEnd - perfData.requestStart;
            return connectTime;
        },
        getCpuSpeed: function (){
            var date1 = new Date();

            for (var i=0, j=1; i<1000000; i++) j++;
            var date2 = new Date();

            return date2.getTime() - date1.getTime();
        },
        getUserCompleteProb: function(){
            var completeTimes = SmartAva.utils.readCookie("sc_complete");
            var highTimeonPage = SmartAva.utils.readCookie("sc_timeonpage");

            if (highTimeonPage >= 20 && completeTimes >=2){
                return "GOLDEN_VIEWEVER"
            }else{
                return "REGULAR_VIEWEVER"
            }

        },

        getLoadSpeed: function(){
            if (document.readyState == "complete"){
                    t = performance.timing
                    return t.loadEventEnd - t.responseEnd
            }else{
                return 5000000
            }

        },
        getClientStatus: function(){
            var netRaw = SmartAva.utils.getNetworkSpeed();
            var cpuRaw = SmartAva.utils.getCpuSpeed();
            var loadRaw = SmartAva.utils.getLoadSpeed();

            var net = "GOLDEN";
            if (netRaw > 500 && netRaw < 2000) net = "REGULAR"
            if (netRaw > 2000) net = "SLOW";

            var cpu = "GOLDEN";
            if (cpuRaw >10 && cpuRaw < 20 ) cpu = "REGULAR"
            if (cpuRaw >20 ) cpu = "SLOW"

            var load = "REGULAR";
            if (loadRaw < 4000) load = "GOLDEN";
            if (net == "GOLDEN" && cpu =="GOLDEN" && load=="GOLDEN") return "PLATINUM"
            if (net == "GOLDEN" && cpu =="GOLDEN") return "GOLDEN"
            if (net =="SLOW" || cpu =="SLOW" ) return "SLOW"
            return "REGULAR";

        },
        createCookie: function(name, value, hours) {
            var expires = "";
            if (hours) {
                var date = new Date();
                hours = hours * 1000;
                date.setTime(date.getTime() + (3600 * hours));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        eraseCookie: function(name) {
            createCookie(name, "", -1);
        },
        isMobile: function() {
            var check = false;
            (function(a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },
        insertCss: function(cssId, file) {
            var head = top.document.getElementsByTagName('head')[0];
            var link = top.document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = file;
            link.media = 'all';
            head.appendChild(link);
        },
        createcssClasses: function(Ava_conf) {
            var vertical = "bottom";
            var horizontal = "right";
            if (Ava_conf.position){
                if (Ava_conf.position.vertical) vertical = Ava_conf.position.vertical;
                if (Ava_conf.position.horizontal) horizontal = Ava_conf.position.horizontal;
            }
            top.document.querySelector('head').insertAdjacentHTML("beforeend", "<style type='text/css'> .fixed_intext_sc_v1{ position: fixed !important; width: " + Ava_conf.playerWidth + "px!important;height: " + Ava_conf.playerHeight + "px !important; "+ horizontal + ": " + Ava_conf.player_margin_right + "px ;"+ vertical + ": " + Ava_conf.player_margin_bottom + "px;opacity: 0;z-index: 128362132;} </style>");
            //top.smartclipJquery("<style type='text/css'> .fixed_intext_EL_sc_v1{ position: fixed !important; right: "+ top.Site_conf.ava_desk.player_margin_right + "px ;bottom: " + top.Site_conf.ava_desk.player_margin_bottom +"px;z-index: 128362132;} </style>").appendTo("head");
            top.document.querySelector('head').insertAdjacentHTML("beforeend", "<style type='text/css'> .intxt_adjust{ width: 100% !important;height: 100% !important;}</style>");
            top.document.querySelector('head').insertAdjacentHTML("beforeend", "<style type='text/css'> .fixed_intext_sc_mob_v1 {position: fixed!important; " + vertical +": 0px; width: 100%!important; min-height: 180px; left: 0px; z-index: 64654651464; margin-bottom: " + Ava_conf.player_margin_bottom + "px!important;opacity: 0;}</style>");
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
        isInview: function(refTop, refBot, margin_bot, margin_top) {

            //    var elemHeight = elem.width() /16 * 9;
            var docViewTop = top.smartclipJquery(top.window).scrollTop();
            var docViewBot = docViewTop + top.window.innerHeight; //pixels from top to bottom of the view
            var visible;
            // 50 is the default margin for bot and top
            if (docViewBot < refBot - 50 + margin_bot || docViewTop > refTop - 50 - margin_top) { //100 is bot top pixels margin TODO PARAM THIS FROM CONF
                visible = false;
            } else {
                visible = true;
            }
            return visible;
        },
        loadScript: function(src) {

            var script = document.createElement("SCRIPT");
            script.src = src;
            script.type = 'text/javascript';
            top.window.document.getElementsByTagName("head")[0].appendChild(script);

        },
        loadJsResources: function(js) {
            //Load Jquery and css

            for (var index = 0; index < js.length; ++index) {
                SmartAva.utils.loadScript(js[index]);
            }

        },
        loadImages: function(image_src) {
            var img = document.createElement("IMG");
            img.src = image_src;
            img.type = 'text/javascript';
            img.style = "display:none"
            document.body.appendChild(img);
        },
        loadImgsPixels: function(pxl) {
            for (var index = 0; index < pxl.length; ++index) {
                SmartAva.utils.loadImages(pxl[index]);
            }

        },
        addClassToElement: function(cssClass, container, flag) {

            container.className = cssClass;
            if (!flag) {
                SmartAva.utils.startCallback(container);
            }

        },
        startCallback: function(container) {
            VideoManager.ava.startCallback(container);
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
        getCountry: function() {
            var country;
            if (SmartIntxt.config.site_name.includes("_")) {
                country = SmartIntxt.config.site_name.split("_")[0];
            } else {
                country = "es";
            }
            return country;
        },
        fireDataPixels: function(event) {
            if (typeof(eventPixelsFired) == "undefined") eventPixelsFired = {start: false, noAd: false, complete: false};
            var pixels = SmartAva.utils.getPixelUrls(event);
            switch (event) {
                case "start":
                    if (!eventPixelsFired.start){
                        SmartAva.utils.loadImgsPixels(pixels);
                        eventPixelsFired.start = true;
                    }
                    break;
                case "noAd":
                    if (!eventPixelsFired.noAd) {
                        SmartAva.utils.loadImgsPixels(pixels);
                        eventPixelsFired.noAd = true;
                    }
                    break;
                case "complete":
                    if (!eventPixelsFired.complete) {
                        SmartAva.utils.loadImgsPixels(pixels);
                        eventPixelsFired.complete = true;
                    }
                    break;
            }
        },
        getPixelUrls: function(event) {
            var context = SmartAva.utils.getVideoContext(event);
            var pixelUrls = [];
            var pixelStack = SmartAva.config.pixels;
            for (var i = 0; i < pixelStack.length; ++i) {
                if (SmartAva.utils.isPixelInContext(pixelStack[i], context)) {
                    if (pixelStack[i].needPlayerId) pixelStack[i].url += context.playerId;
                    pixelUrls.push(pixelStack[i].url);
                }
            }
            return pixelUrls;
        },
        getVideoContext: function(event) {
            var context = {};
            if (event) context.event = event;
            context.playerId = VideoManager.ava.getIntxtPlayerId();
            context.device = SmartAva.utils.isMobile() ? "mob" : "pc";
            context.config = SmartAva.utils.isMobile() ? top.Site_conf.ava.mobile : top.Site_conf.ava.web;
            context.country = SmartAva.utils.getCountry();
            if (context.config.enabled) {
                context.format = context.config.keepFixed ? context.format = "jump": context.format = "ava";
            } else {
                context.format = "intext";
            }
            return context;
        },
        isPixelInContext: function (pixel, context) {
            if (!(typeof(pixel.event) != "undefined" && pixel.event.includes(context.event)) && !(typeof(pixel.event) == "undefined" && context.event == "start")) return false;
            if (!(typeof(pixel.country) != "undefined" && pixel.country.includes(context.country)) && !(typeof(pixel.country) == "undefined")) return false;
            if (!(typeof(pixel.format) != "undefined" && pixel.country.includes(context.format)) && !(typeof(pixel.format) == "undefined")) return false;
            if (!(typeof(pixel.device) != "undefined" && pixel.device.includes(context.device)) && !(typeof(pixel.device) == "undefined")) return false;
            if (typeof(pixel.frequency) != "undefined" && VideoManager.ava.freqReached(pixel.name, pixel.frequency[0], pixel.frequency[1])) return false;
            return true;
        }
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


SmartInphoto = {
    utils: {
        insertContainerOnImage: function(inphotoImg, element) {

            element.className += "sc_inphoto_container";
            //inphotoImg.appendChild(element);

            inphotoImg.parentNode.insertBefore(element, inphotoImg.nextSibling);

        },
        insertInphotoCssDependencies: function() {
            top.document.querySelector('head').insertAdjacentHTML("beforeend", "<style type='text/css'> .sc_inphoto_container{ position:absolute!important;z-index: 128362132;top:0;left:0;width:100%} </style>");
        },
        intxtEnd: function() {
            SmartInphoto.utils.removeCoverOnIntxtEnd();

        },
        removeCoverOnIntxtEnd: function() {
            if (top.document.getElementById("smartclip_inphoto_video_2-backdrop")) {
                setTimeout(function() {
                    SmartInphoto.utils.removeCoverOnIntxtEnd()
                }, 500);

            } else {
                if (top.document.getElementById("smartclip_inphoto_cover")) top.document.getElementById("smartclip_inphoto_cover").style.display = "none";
                if (top.document.getElementById("smartclip_inphoto_video")) top.document.getElementById("smartclip_inphoto_video").style.display = "none";
            }
        },
        removeCover: function() {

            if (top.document.getElementById("smartclip_inphoto_cover")) top.document.getElementById("smartclip_inphoto_cover").style.display = "none";
        },
        getFormatFromImage: function(img) {


            if (!img.height || !img.width) return false;
            var margin = Math.round(img.width / 8)
            //SQUARE
            if (img.height - img.width < margin && img.height - img.width >= 0) return "SQUARE";
            if (img.width - img.height < margin && img.width - img.height >= 0) return "square";
            //LONGHEIGHT
            if (img.height - img.width > margin) return "LONG_HEIGHT";
            //LONGWIDTH
            if (img.width - img.height > margin) return "LONG_WIDTH";
            //Pending validate min width

            return false;


        },
        loadInphotoDeviceConf: function() {
            MySmartclipConf = {
                inphoto: {
                    enabled: "null",
                    minWidth: "null",
                    ratio: "null", // 16/9 Please
                    impsPerPageLoaded: "null",
                    frequence: "null",
                    nonstop: "null",
                    skipOffset: "null",
                    skipText: "null",
                    single_tag: "null",
                    hardSkip: "null"
                }
            }
            if (SmartAva.utils.isMobile()) {
                MySmartclipConf.inphoto.enabled = top.Site_conf.inphoto.mobile.enabled;
                MySmartclipConf.inphoto.minWidth = top.Site_conf.inphoto.mobile.minWidth;
                MySmartclipConf.inphoto.ratio = top.Site_conf.inphoto.mobile.ratio;
                MySmartclipConf.inphoto.impsPerPageLoaded = top.Site_conf.inphoto.mobile.impsPerPageLoaded;
                MySmartclipConf.inphoto.frequence = top.Site_conf.inphoto.mobile.frequence;
                MySmartclipConf.inphoto.nonstop = top.Site_conf.inphoto.mobile.nonstop;
                MySmartclipConf.inphoto.skipOffset = top.Site_conf.inphoto.mobile.skipOffset;
                MySmartclipConf.inphoto.skipText = top.Site_conf.inphoto.mobile.skipText;
                MySmartclipConf.inphoto.smaracd_player = top.Site_conf.inphoto.mobile.smaracd_player;
                MySmartclipConf.inphoto.nocover = top.Site_conf.inphoto.mobile.nocover;
                MySmartclipConf.inphoto.single_tag = top.Site_conf.inphoto.mobile.single_tag;
                MySmartclipConf.inphoto.hardSkip = top.Site_conf.inphoto.mobile.hardSkip;
            } else {
                MySmartclipConf.inphoto.enabled = top.Site_conf.inphoto.web.enabled;
                MySmartclipConf.inphoto.minWidth = top.Site_conf.inphoto.web.minWidth;
                MySmartclipConf.inphoto.ratio = top.Site_conf.inphoto.web.ratio;
                MySmartclipConf.inphoto.impsPerPageLoaded = top.Site_conf.inphoto.web.impsPerPageLoaded;
                MySmartclipConf.inphoto.frequence = top.Site_conf.inphoto.web.frequence;
                MySmartclipConf.inphoto.nonstop = top.Site_conf.inphoto.web.nonstop;
                MySmartclipConf.inphoto.skipOffset = top.Site_conf.inphoto.web.skipOffset;
                MySmartclipConf.inphoto.skipText = top.Site_conf.inphoto.web.skipText;
                MySmartclipConf.inphoto.smaracd_player = top.Site_conf.inphoto.web.smaracd_player;
                MySmartclipConf.inphoto.nocover = top.Site_conf.inphoto.web.nocover;
                MySmartclipConf.inphoto.single_tag = top.Site_conf.inphoto.web.single_tag;
                MySmartclipConf.inphoto.hardSkip = top.Site_conf.inphoto.web.hardSkip;
            }
        },
        checkImg: function(img) {
            var result = false
            if (!img.height || !img.width) return false;
            var myratio = Math.round(img.height * 16 / 9);
            var imgwidth = img.width;
            if (myratio - imgwidth == 0 || myratio - imgwidth == 1 || myratio - imgwidth == -1 || myratio - imgwidth == -2 || myratio - imgwidth == 2 || myratio - imgwidth == -3 || myratio - imgwidth == 3 || myratio - imgwidth == -4 || myratio - imgwidth == 4 || myratio - imgwidth == -5 || myratio - imgwidth == 5 || myratio - imgwidth == -6 || myratio - imgwidth == 6) { //is 16/9 and fits to min width? TODO REFACT no mires JM
                if (imgwidth >= MySmartclipConf.inphoto.minWidth) result = true
            }
            return result;


        },
        getSuitableImg: function() {
            var allImgs = top.document.getElementsByTagName("img");
            for (i = 0; i < allImgs.length; i++) {
                if (SmartInphoto.utils.checkImg(allImgs[i])) {
                    return allImgs[i];
                }
            }


        },
        getElementPosition: function(element) {


            if (typeof window.getComputedStyle(element).position != "undefined") {

                if (window.getComputedStyle(element).position == "relative" || window.getComputedStyle(element.parentNode.parentNode).position == "relative" || window.getComputedStyle(element.parentNode).position == "relative" || window.getComputedStyle(element.parentNode.parentNode.parentNode).position == "relative") {

                    return true
                } else {
                    return false
                }
                //if (element.parentNode.style.position == 'fixed' || element.parentNode.style.position == 'absolute' || element.parentNode.style.position == 'static' || element.parentNode.style.position == 'sticky') return false;

            } else {
                return false
            }

        },
        getElementMargin: function(element) {
            var p = document.getElementById("target");
            var style = p.currentStyle || window.getComputedStyle(p);

            display("Current marginTop: " + style.marginTop);
        },
        getRestOfSuitableImg: function() {
            var result = {};
            var allImgs = top.document.getElementsByTagName("img");
            for (i = 0; i < allImgs.length; i++) {

                //allImgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.position
                if (allImgs[i].width >= MySmartclipConf.inphoto.minWidth && allImgs[i].width < allImgs[i].height * 4 && SmartInphoto.utils.getElementPosition(allImgs[i])) {

                    if (SmartInphoto.utils.getFormatFromImage(allImgs[i]) == "SQUARE") {
                        result.img = allImgs[i];
                        result.format = "SQUARE";
                        return result;
                    }
                    if (SmartInphoto.utils.getFormatFromImage(allImgs[i]) == "LONG_HEIGHT") {
                        result.img = allImgs[i];
                        result.format = "LONG_HEIGHT";
                        return result;
                    }
                    if (SmartInphoto.utils.getFormatFromImage(allImgs[i]) == "LONG_WIDTH") {
                        result.img = allImgs[i];
                        result.format = "LONG_WIDTH";
                        return result;
                    }
                }
            }
            return result;
        },
        coverImg: function(img, opc) {

            var inphotoElementName = "smartclip_inphoto_cover";
            var width = Number(window.getComputedStyle(img).width.split("px")[0]) + 0.01 + "px";
            var inphotoElement = '<div id="' + inphotoElementName + '" style="background-color: white;opacity: ' + opc + ';position : absolute;top:0;left:0;z-index:100;width:' + width + ';padding:0;transition: height 1s;"></div>';
            //Insert this element on the photo.

            top.document.body.insertAdjacentHTML('beforeend', inphotoElement);
            var element = top.document.getElementById(inphotoElementName);
            img.parentNode.insertBefore(element, img.nextSibling);
            element.style.height = window.getComputedStyle(img).height;
            element.style.margin = window.getComputedStyle(img).margin;


        },
        startRestPhotos: function(img, format, container) {
            var padding_left = 0;
            var cont_width, cont_height;
            var padding_top = 0;
            img_width = img.width;
            img_height = img.height;
            format = "SQUARE"; //Forzed to use only square, itÃ‚Â´s working awesome
            switch (format) {
                //width = height *16/9
                //height = width/1.7777777777777777
                case "SQUARE":

                    padding_left = img.width / 10 / 4;
                    cont_width = img_width - padding_left * 2;
                    cont_height = cont_width / 1.7777777777777777;
                    padding_top = (img_height - cont_height) / 2;
                    break;

                case "LONG_WIDTH":
                    cont_height = img_height;
                    cont_width = cont_height * 16 / 9;
                    padding_left = (img_width - cont_width) / 2;
                    break;

                case "LONG_HEIGHT":
                    cont_width = img_width;
                    cont_height = cont_width / 1.7777777777777777;
                    padding_left = 0;
                    padding_top = (img_height - cont_height) / 2;
                    break

                default:
                    console.log("INPHOTO: something went wrong");
                    break;
            }
            if (padding_left < 2) {
                padding_left = 0;
            }
            if (padding_top < 2) {
                padding_top = 0;
            }
            var inphotoElementName = "smartclip_inphoto_video_2";
            var inphotoElement = '<div id="' + inphotoElementName + '" style="left:' + padding_left + 'px;top:' + padding_top + 'px;position : absolute!important;z-index:1000;width:' + cont_width + 'px;transition: height 1s;"></div>';
            //Insert this element on the photo.
            container.style.position = "absolute";
            container.style.top = 0;
            img.parentNode.insertBefore(container, img.nextSibling);
            container.insertAdjacentHTML('beforeend', inphotoElement);
            var element = top.document.getElementById(inphotoElementName);
            element.style.margin = window.getComputedStyle(img).margin;
            console.log("start_inphoto");
            SmartIntxt.init();
            //img.parentNode.insertBefore(element, img.nextSibling);



        },
        saveIntextConf: function() {

            if (SmartAva.utils.isMobile()) {
                var Backup = {
                    skipOffset: top.Site_conf.ava_desk.skipOffset,
                    skipText: top.Site_conf.ava_desk.skipText,
                    smaracd_player: SmartIntxt.config.playerHTML5,
                    elementContainer: SmartIntxt.config.elementContainer
                };

                top.Site_conf.ava_desk.skipOffset = top.Site_conf.inphoto.mobile.skipOffset;
                top.Site_conf.ava_desk.skipText = top.Site_conf.inphoto.mobile.skipText;
                SmartIntxt.config.playerHTML5 = top.Site_conf.inphoto.mobile.smaracd_player;

            } else {
                var Backup = { //need to change this when configs work in mobile
                    skipOffset: top.Site_conf.inphoto.web.skipOffset,
                    skipText: top.Site_conf.inphoto.web.skipText,
                    smaracd_player: SmartIntxt.config.playerHTML5,
                    elementContainer: SmartIntxt.config.elementContainer
                };

                top.Site_conf.ava_desk.skipOffset = top.Site_conf.inphoto.web.skipOffset;
                top.Site_conf.ava_desk.skipText = top.Site_conf.inphoto.web.skipText;
                SmartIntxt.config.playerHTML5 = top.Site_conf.inphoto.web.smaracd_player;
            }
            return Backup;
        },
        restoreIntextConf: function(Backup) {
            top.Site_conf.ava_desk.skipOffset = Backup.skipOffset;
            top.Site_conf.ava_desk.skipText = Backup.skipText;
            SmartIntxt.config.playerHTML5 = Backup.smaracd_player;
            SmartIntxt.config.elementContainer = Backup.elementContainer;
        }

    },
    init: function() {
        var site_name = SmartIntxt.config.site_name;
        var siteConfPath = "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/inphoto/";
        var loader = "main.js";
        var sc = document.createElement("SCRIPT");
        sc.src = siteConfPath + loader;
        sc.type = 'text/javascript';
        sc.onload = sc.onreadystatechange = function() {
            if (typeof SC_inphoto_loader == "undefined") SC_inphoto_loader = top.SC_inphoto_loader;
            SC_inphoto_loader.config.site_name = site_name;
            SC_inphoto_loader.init();
        };
        top.window.document.getElementsByTagName("head")[0].appendChild(sc);
    }

};


VideoManager = {
    ava: {
        videoAdStarted: function() {
            if (typeof firedDataPixels == "undefined") {
                VideoManager.ava.setCookieIfUserStaysTimeonPage(0,25);
                firedDataPixels = true;
            }
        },
        videoAdEmpty: function() {
            if (typeof firedNoAdPixels == "undefined") {
                firedNoAdPixels = true;
                setTimeout(function(){
                        var sb = document.createElement("img");
                        sb.src= "https://sb.scorecardresearch.com/p?c1=2&c2=18259431&ns_ap_sv=2.1511.10&ns_type=hidden&ns_st_it=a&ns_st_sv=4.0.0&ns_st_ad=1&ns_st_sq=1&ns_st_id="+getGuid()+"&ns_st_ec=2&ns_st_cn=1&ns_st_ev=end&ns_st_ct=val11&ns_st_cl=30&ns_st_pt=0&c3=&c4=&c6=&ns_ts="+ Math.round(Math.random() * 1e8)
                        document.body.appendChild(sb);
                    }
                    ,20000)
            }
            if (typeof top.__smxLogData !== "undefined") top.__smxLogData.isEmpty = true;
        },
        videoAdEnded : function(){
            if (typeof firedCompleteDataPixels == "undefined" && typeof firedNoAdPixels == "undefined") {
                VideoManager.ava.freqReached("sc_complete",2,58)
                firedCompleteDataPixels = true;
            }
        },
        startCallback: function(container) {

            Site_conf = top.Site_conf;
            //var Settings = VideoManager.ava.saveIntextConf();
            var Ava_conf = VideoManager.ava.loadAvaConfDevice();
            Ava_conf.ima ? SmartAva.utils.startScPlayer(container) : SmartAva.utils.startSmartIntext(container,"ava")

            //SmartIntxt.init();
            try {
                initializeLogging();
            } catch (e) {
                // statements
                console.log(e);
            }

        },
        loadAvaConf: function() {
            if (typeof avaConfRequested == 'undefined') {
                SmartAva.utils.loadScript(SmartAva.config.siteConfPath + SmartIntxt.config.site_name + ".js"); //TODO link with smartclipConf files
                avaConfRequested = true;
            }

        },
        loadAvaConfDevice: function() {
            return top.Site_conf.ava[SmartAva.utils.isMobile() ? "mobile" : "web"]
        },
        getIntxtPlayerId: function() {
            var player_id = top.Site_conf.ava.web.smaracd_player;
            if (!traditionalIntext) {
                if (SmartAva.utils.isMobile()) {
                    player_id = top.Site_conf.ava.mobile.smaracd_player;
                }
            } else {
                player_id = SmartIntxt.config.playerHTML5;
            }
            return player_id;
        },
        saveIntextConf: function() {

            if (SmartAva.utils.isMobile()) {
                var Backup = {
                    skipOffset: top.Site_conf.ava_desk.skipOffset,
                    skipText: top.Site_conf.ava_desk.skipText,
                    smaracd_player: SmartIntxt.config.playerHTML5,
                    elementContainer: SmartIntxt.config.elementContainer
                };

                top.Site_conf.ava_desk.skipOffset = top.Site_conf.ava.mobile.skipOffset;
                top.Site_conf.ava_desk.skipText = top.Site_conf.ava.mobile.skipText;
                SmartIntxt.config.playerHTML5 = top.Site_conf.ava.mobile.smaracd_player;

            } else {
                var Backup = { //need to change this when configs work in mobile
                    skipOffset: top.Site_conf.ava.web.skipOffset,
                    skipText: top.Site_conf.ava.web.skipText,
                    smaracd_player: SmartIntxt.config.playerHTML5,
                    elementContainer: SmartIntxt.config.elementContainer
                };

                top.Site_conf.ava_desk.skipOffset = top.Site_conf.ava.web.skipOffset;
                top.Site_conf.ava_desk.skipText = top.Site_conf.ava.web.skipText;
                SmartIntxt.config.playerHTML5 = top.Site_conf.ava.web.smaracd_player;
            }
            return Backup;
        },
        restoreIntextConf: function(Backup) {
            top.Site_conf.ava_desk.skipOffset = Backup.skipOffset;
            top.Site_conf.ava_desk.skipText = Backup.skipText;
            SmartIntxt.config.playerHTML5 = Backup.smaracd_player;
            SmartIntxt.config.elementContainer = Backup.elementContainer;
        },
        customPositionIntext: function() {
            if (SmartIntxt.config.customLocation) {
                SmartIntxt.config.positioning(); //insert intext contaiÃ‚Âºer element
            }
        },
        executeIntxtContainerPositioning: function() {
            VideoManager.ava.customPositionIntext();

        },
        manageFrequencies: function(Ava_conf) {
            var freq_cookie_name = "sc-ava-freq-" + SmartIntxt.config.site_name;
            var cookie_value = VideoManager.ava.readCookie(freq_cookie_name);
            var init_value = 1;
            var result = true;
            if (Ava_conf.freq != 0) {

                if (cookie_value) {
                    if (cookie_value > Ava_conf.freq) {
                        result = false;
                    } else {
                        VideoManager.ava.createCookie(freq_cookie_name, parseInt(cookie_value) + 1, 1)
                    }
                } else {
                    VideoManager.ava.createCookie(freq_cookie_name, init_value, 1)
                }
            }
            return result;
        },
        setCookieIfUserStaysTimeonPage: function(count, secs){
            if (count<=secs){
                count=count+5;
                setTimeout(function(){
                    VideoManager.ava.setCookieIfUserStaysTimeonPage(count,secs)
                }, 5000)

            }else{
                VideoManager.ava.createCookie("sc_timeonpage",secs,58)
            }
        },
        freqReached: function(name,value,time){
            var cookie_value = VideoManager.ava.readCookie(name);
            var result = false;
            if (value!=0){
                if (cookie_value) {
                    if (cookie_value > value) {
                        result = true;
                    } else {
                        VideoManager.ava.createCookie(name, parseInt(cookie_value) + 1, time);
                    }
                } else {
                    VideoManager.ava.createCookie(name, 1, time);
                }
            }
            return result;
        },
        createCookie: function(name, value, hours) {
            var expires = "";
            if (hours) {
                var date = new Date();
                hours = hours * 1000;
                date.setTime(date.getTime() + (3600 * hours));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        eraseCookie: function(name) {
            VideoManager.ava.createCookie(name, "", -1);
        },
        discardAva: function(Ava_conf) {
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
                return true;
            }
            var allow_ava = VideoManager.ava.manageFrequencies(Ava_conf);
            if (!allow_ava) {
                return true;
            }
            if (Ava_conf.enabled == false) {
                return true;
            }
            return false;

        },
        getElementsCrossFrames: function(selector) {
            var result = document.querySelectorAll(selector);
            if (result.length == 0) result = top.document.querySelectorAll(selector);
            return result;
        },
        getElementIdCrossFrames: function(id) {
            var result = document.getElementById(id);
            if (!result) result = top.document.getElementById(id);
            return result;
        },
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
        loadCssResources: function(Ava_conf) {
            SmartAva.utils.createcssClasses(Ava_conf);
            //console.log(Ava_conf);
            for (var index = 0; index < Ava_conf.css.length; ++index) {
                SmartAva.utils.insertCss("SmartAvaCss_" + index, Ava_conf.css[index]);
            }
        },
        prepareDocumentForAva: function(Ava_conf) {
            VideoManager.ava.loadCssResources(Ava_conf);
            if (SmartIntxt.config.elementContainer == "") {
                SmartIntxt.init(); //Init intext so elements are included on page
            }
        },
        ready: function(containerName, Ava_conf) {

            top.avaContainerElement = containerName;
            SmartAva.init(containerName, Ava_conf);
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
    },
    inphoto: {
        utils: {

            prepareInphotoContainer: function() {
                var inphotoElementName = "smartclip_inphoto_video";
                var inphotoElement = '<div id="' + inphotoElementName + '"></div>';
                top.document.body.insertAdjacentHTML('beforeend', inphotoElement);
                return top.document.getElementById(inphotoElementName);
            }
        },
        init: function() {
            top.SmartInphoto = SmartInphoto;
            if (typeof top.Site_conf == 'undefined') {
                if (typeof loaded_conf_flag == 'undefined') {
                    SmartAva.utils.loadScript(SmartAva.config.siteConfPath + SmartIntxt.config.site_name + ".js"); //TODO link with smartclipConf files
                    loaded_conf_flag = true;
                }
                setTimeout(function() {
                    VideoManager.inphoto.init()
                }, 500);
            } else {
                SmartInphoto.utils.loadInphotoDeviceConf();
                if (MySmartclipConf.inphoto.enabled && !MySmartclipConf.inphoto.single_tag) {
                    SmartInphoto.init();
                }
            }
        }
    }
};


VideoManager.ava.init();
VideoManager.inphoto.init();

 */