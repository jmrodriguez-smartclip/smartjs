import Service from '../Service/Service';
import * as Common from '../Common.js';
import * as Compat from './CrossCompat.js';
import * as Geometry from './Geometry.js';
import * as Browser from './Browser';
import * as UrlInfo from './UrlInfo';
import Timing from './Timing';
export default class PageStats extends Service
{
    initialize(){
        this.enabled = true;
        this.w=this.config.window || window;
        Compat.setDefaultWindow(this.w);
        // Se comprueba si es posible obtener estadisticas de la ventana objetivo.
        try {
            let d=this.w.document;
            let w = this.w;
            this.accumShown=0;
            this.accumHidden=0;
            this.nShows=0;
            this.nHides=0;
            this.isHidden=Compat.isPageHidden();
            this.shownRef=0;
            this.processorSpeed=-1;
            this.networkSpeed=-1;

            this.pixelsScrolled=Compat.getYScroll();
            this.currentScroll=this.pixelsScrolled;
            this.maxScroll=this.currentScroll;
            this.lastScrollTime=-1;
            this.firstScroll=-1;
            this.getProcessorSpeed();
            this.getNetworkSpeed();
            this.currentViewport=Compat.getVisibleViewportRect();
            // Array de 5 elementos para almacenar los tiempos de visionado de cada 20% de la pagina.
            this.viewableZoneTimes=[0,0,0,0,0];
            this.nJsErrors=0;

            this.navigatorW=Compat.getViewportWidth(w);
            this.navigatorH=Compat.getViewportHeight(w);

            let hidFunc=(isHidden)=>{

                if(isHidden===this.isHidden)
                    return;
                this.isHidden=isHidden;
                this.nShows+=isHidden?0:1;
                this.nHides+=isHidden?1:0;
                this.updateShownTimings(isHidden);
            };
            this.scheduler=this.getService("Scheduler");
            this.scheduler.schedule({every:"PAGESHOW"},function(){hidFunc(false);})
            this.scheduler.schedule({every:"PAGEHIDE"},function(){hidFunc(true);})

            Compat.onScroll(()=>this.handleScroll());
            Compat.onResize(()=>this.handleScroll());
            Compat.onError(()=>this.nJsErrors++);
        }
        catch(e){
            this.enabled=false;
            console.dir(e);
        }
    }
    isEnabled(){return this.enabled;}
    updateShownTimings(isHidden)
    {
        let elapsed=this.relativeTimestamp(this.shownRef);
        this.accumShown+=isHidden?0:elapsed;
        this.accumHidden+=isHidden?elapsed:0;
        this.shownRef=this.relativeTimestamp();
    }
    relativeTimestamp(reference=0){
        return this.w.performance.now()-reference;
    }
    getStats(){
        let tims=(new Date()).getTime();
        let localUrl=new UrlInfo.UrlInfo(this.w.location);
        let pathParts=localUrl.getPathParts();
        let nParts=pathParts.length;
        let refererUrl=new UrlInfo.UrlInfo(this.w.document.referrer);
        let bInfo=null;
        bInfo = Browser.browserInfo();
        let timings=Timing.getTimings();
        let w=this.w;
        let nRemoteScripts=null;

        if(w.document.querySelector)
        {
            nRemoteScripts=w.document.querySelectorAll("script[src]").length;
        }
        let origin=null;
        let originLength=0;
        let originList=null;
        if (w.location.ancestorOrigins) {
                originLength = w.location.ancestorOrigins.length;
                origin = w.location.ancestorOrigins[0];
                var originsTmp = [];
                for (var k =0; k< w.location.ancestorOrigins.length;k++){
                    originsTmp.push(w.location.ancestorOrigins[k]);
                }
                originList=originsTmp.join("|");
        }
        else
        {
            originLength=0;
            origin=w.location.origin;
        }
        let doNotTrack=false;
        if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external)
            doNotTrack=(window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || (window.external!=undefined && window.external.msTrackingProtectionEnabled!=undefined && window.external.msTrackingProtectionEnabled()))?true:false;

        let hasCMP="unknown";
        try {
            hasCMP=(top.__cmp!==undefined)
        }catch(e){}

        this.updateShownTimings(Compat.isPageHidden());
        let data = {
            pixelsScrolled: this.pixelsScrolled,
            navigationStart: tims - Math.round(this.w.performance.now()),
            bodyWidth: Compat.getPageWidth(this.w),
            bodyHeight: Compat.getPageHeight(this.w),
            navigatorWidth: Compat.getViewportWidth(),
            navigatorHeight: Compat.getViewportHeight(),
            screenWidth: Compat.getScreenWidth(),
            screenHeight: Compat.getScreenHeight(),
            orientation: Compat.getScreenWidth()> Compat.getScreenHeight()?"landscape":"portrait",
            processorSpeed: this.processorSpeed,
            networkSpeed: this.networkSpeed,
            viewableTime0: this.viewableZoneTimes[0],
            viewableTime20: this.viewableZoneTimes[1],
            viewableTime40: this.viewableZoneTimes[2],
            viewableTime60: this.viewableZoneTimes[3],
            viewableTime80: this.viewableZoneTimes[4],
            firstScroll: parseInt(this.firstScroll),
            maxScroll: this.maxScroll,
            referer: this.w.document.referrer,
            refererDomain: refererUrl.getRootHost(),
            origin:origin,
            originLength:originLength,
            originList:null,
            protocol: localUrl.getProtocol(),
            url: localUrl.getUrl(),
            domain: localUrl.getRootHost(),
            path1: nParts > 0 ? pathParts[0] : "",
            path2: nParts > 1 ? pathParts[1] : "",
            pageViewStart: (new Date().getTime()) - parseInt(this.w.performance.now()),
            pageViewTime: parseInt(this.w.performance.now()),
            nImages: this.w.document.getElementsByTagName("img").length,
            nScripts: this.w.document.getElementsByTagName("script").length,
            nVideos: this.w.document.getElementsByTagName('video').length,
            nIframes: w.document.getElementsByTagName('iframe').length,
            browserName: bInfo.browserName,
            browserVersion: bInfo.browserVersion,
            osName: bInfo.osName,
            osVersion: bInfo.osVersion,
            device: bInfo.device,
            deviceCores: bInfo.deviceCores,
            pageLoadTime: parseInt(timings.loadTime),
            pageLoadEvent: parseInt(timings.loadEventTime),
            pageReadyTime: parseInt(timings.readyTime),
            pageReadyEvent: parseInt(timings.readyEventTime),
            pageTransferSize: timings.transferSize || null,
            pageDecodedSize: timings.decodedBodySize || null,
            gotPageReady: document.readyState === "interactive" || document.readyState === "complete",
            gotPageLoad: document.readyState === "complete",
            headLength: (w.document.head && w.document.head.innerHTML) ? w.document.head.innerHTML.length : 0,
            bodyLength: (w.document.body && w.document.body.innerHTML) ? w.document.body.innerHTML.length : 0,
            nRemoteScripts: nRemoteScripts,
            netInfoDownlink: null,
            netInfoEffType: null,
            netInfoRtt: null,
            netInfoType: null,
            netInfoDownlinkMax: null,
            nPageHides: this.nHides,
            nPageShows: this.nShows,
            timeShowingPercent:Math.ceil(100*this.accumShown/this.w.performance.now()),
            jsErrors:this.nJsErrors,
            doNotTrack:doNotTrack,
            cmp:hasCMP
        };


        if(Common.isset(navigator.connection))
        {
            let fields=["downlink","effectiveType","rtt","type","downlinkMax"];
            let variables=["netInfoDownlink","netInfoEffType","netInfoRtt","netInfoType","netInfoDownlinkMax"];
            for(let k=0;k<fields.length;k++)
            {
                let cV=fields[k];
                if(Common.isset(navigator.connection[cV]))
                    data[variables[k]]=navigator.connection[cV];
            }
            if(isNaN(parseFloat(data.netInfoDownlink)))
                data.netInfoDownlink=0;
        }

        return data;
        }
        handleScroll()
        {

            let temp=Compat.getYScroll();
            if(temp > this.maxScroll)
                this.maxScroll=temp;

            if(this.firstScroll===-1)
                this.firstScroll=this.relativeTimestamp();
            this.pixelsScrolled+=Math.abs(temp-this.currentScroll);
            let lastViewport=this.currentViewport;
            let elapsed=this.relativeTimestamp(this.lastScrollTime);
            let pageZoneHeight=Compat.getPageHeight()/5;

            let pageWidth=Compat.getPageWidth();
            let viewportArea=Math.max(1,Geometry.getArea(lastViewport));

            for(let k=0;k<5;k++)
            {
                let zoneCoords={left:0,right:pageWidth,top:k*pageZoneHeight,bottom:(k+1)*pageZoneHeight};
                let inters=Geometry.getIntersection(zoneCoords,lastViewport);
                if(inters)
                {
                    let screenPercent=Geometry.getArea(inters)/viewportArea;
                    this.viewableZoneTimes[k]+=parseInt(elapsed*screenPercent);
                }
            }
            this.currentViewport=Compat.getVisibleViewportRect();
            this.lastScrollTime=this.relativeTimestamp();
            this.currentScroll=temp;

    }
    getProcessorSpeed()
    {
        let t1 = this.w.performance.now();
        for (let t = 0; t < 20000; t++);
        this.processorSpeed = (this.w.performance.now() - t1);
    }
    getNetworkSpeed()
    {
        let imageAddr = this.config.cloudUrl+this.config.sampleFile;"spt.png";
        let downloadSize = this.config.sampleSize;
        let startTime=this.relativeTimestamp();
        let download = new Image();
        let j=this;
        download.onload = function () {
            j.networkSpeed=j.relativeTimestamp(startTime);
        };
        let cacheBuster = "?nnn=" + (new Date()).getTime();
        download.src = imageAddr + cacheBuster;


    }
    getLabel()
    {
        return "PageStats";
    }
}
