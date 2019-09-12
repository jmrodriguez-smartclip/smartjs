import Service from '../Service/Service';
import BaseLogger from "../Log/BaseLogger"
import * as Common from '../Common.js';
import * as Compat from './CrossCompat.js';
import * as Geometry from './Geometry.js';
import * as Browser from './Browser';
import * as UrlInfo from './UrlInfo';
import Timing from './Timing';

export default class PageStats extends Service {
    initialize() {
        this.logger = this.serviceContainer.get("Log");
        this.w = this.config.window || window;
        Compat.setDefaultWindow(this.w);

        let d = this.w.document;
        let w = this.w;
        this.accumShown = 0;
        this.accumHidden = 0;
        this.nShows = 0;
        this.nHides = 0;
        this.currentScroll = Compat.getYScroll();
        this.pixelsScrolled = 0;
        this.maxScroll = this.currentScroll;
        this.lastScrollTime = -1;
        this.firstScroll = -1;
        this.isHidden = Compat.isPageHidden();
        this.logBasicInfo();
        this.pageViewStart = this.shownRef = (new Date()).getTime();


        this.scheduler = this.getService("Scheduler");
        this.scheduler.schedule({when: "READY"}, () => {
            this.onReady();
        });
        this.scheduler.schedule({when: "LOAD"}, () => {
            this.onLoad();
        });
        this.scheduler.schedule({every: "PAGESHOW"}, () => {
            this.updateShownTimings(false)
        })
        this.scheduler.schedule({every: "PAGEHIDE"}, () => {
            this.updateShownTimings(true)
        })
        Compat.onScroll(() => this.handleScroll());
        Compat.onResize(() => this.handleScroll());
        Compat.onError(() => this.nJsErrors++);

    }

    log(type, data) {
        this.logger.log(BaseLogger.LOG_INFO, "PageStats", null, data);
    }

    exception(type, data) {
        this.logger.log(BaseLogger.LOG_ERR, "PageStats", null, data);
    }

    logBasicInfo() {
        let tims = (new Date()).getTime();
        let localUrl = new UrlInfo.UrlInfo(this.w.location);
        let pathParts = localUrl.getPathParts();
        let nParts = pathParts.length;
        let refererUrl = new UrlInfo.UrlInfo(this.w.document.referrer);
        let bInfo = null;
        bInfo = Browser.browserInfo();
        let timings = Timing.getTimings();
        let w = this.w;
        let origin = null;
        let originLength = 0;
        let originList = null;
        if (w.location.ancestorOrigins) {
            originLength = w.location.ancestorOrigins.length;
            origin = w.location.ancestorOrigins[0];
            var originsTmp = [];
            for (var k = 0; k < w.location.ancestorOrigins.length; k++) {
                originsTmp.push(w.location.ancestorOrigins[k]);
            }
            originList = originsTmp.join("|");
        } else {
            originLength = 0;
            origin = w.location.origin;
        }
        let doNotTrack = false;
        if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external)
            doNotTrack = (window.doNotTrack == "1" || navigator.doNotTrack === "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || (window.external != undefined && window.external.msTrackingProtectionEnabled != undefined && window.external.msTrackingProtectionEnabled())) ? true : false;

        let data = {
            pixelsScrolled: 0,
            navigationStart: tims - Math.round(this.w.performance.now()),
            navigatorWidth: Compat.getViewportWidth(),
            navigatorHeight: Compat.getViewportHeight(),
            screenWidth: Compat.getScreenWidth(),
            screenHeight: Compat.getScreenHeight(),
            orientation: Compat.getScreenWidth() > Compat.getScreenHeight() ? "landscape" : "portrait",
            referer: this.w.document.referrer,
            refererDomain: refererUrl.getRootHost(),
            origin: origin,
            originLength: originLength,
            originList: null,
            protocol: localUrl.getProtocol(),
            url: localUrl.getUrl(),
            domain: localUrl.getRootHost(),
            path1: nParts > 0 ? pathParts[0] : "",
            path2: nParts > 1 ? pathParts[1] : "",
            pageViewStart: (new Date().getTime()) - parseInt(this.w.performance.now()),
            browserName: bInfo.browserName,
            browserVersion: bInfo.browserVersion,
            osName: bInfo.osName,
            osVersion: bInfo.osVersion,
            device: bInfo.device,
            deviceCores: bInfo.deviceCores,
            gotPageReady: document.readyState === "interactive" || document.readyState === "complete",
            gotPageLoad: document.readyState === "complete",
            netInfoDownlink: null,
            netInfoEffType: null,
            netInfoRtt: null,
            netInfoType: null,
            netInfoDownlinkMax: null,
            nPageHides: this.nHides,
            nPageShows: this.nShows,
            doNotTrack: doNotTrack
        };

        let wn = window;
        if (wn.getBattery !== undefined) {
            wn.getBattery().then((b) => {
                data.batteryLevel = b.level;
                data.batteryCharging = b.charging;
            })
        }

        if (wn.doNotTrack !== undefined)
            data.doNotTrack = wn.doNotTrack;

        if (Common.isset(navigator.connection)) {
            let fields = ["downlink", "effectiveType", "rtt", "type", "downlinkMax"];
            let variables = ["netInfoDownlink", "netInfoEffType", "netInfoRtt", "netInfoType", "netInfoDownlinkMax"];
            for (let k = 0; k < fields.length; k++) {
                let cV = fields[k];
                if (Common.isset(navigator.connection[cV]))
                    data[variables[k]] = navigator.connection[cV];
            }
            if (isNaN(parseFloat(data.netInfoDownlink)))
                data.netInfoDownlink = 0;
        }
        this.basicStats=data;

        this.log("Basic", data);
    }


    updateShownTimings(isHidden) {
        if (isHidden)
            this.nHides++;
        else
            this.nShows++;
        let elapsed = this.relativeTimestamp(this.shownRef);
        this.accumShown += isHidden ? 0 : elapsed;
        this.accumHidden += isHidden ? elapsed : 0;
        this.shownRef = this.relativeTimestamp();

        this.log("Basic", {
            nHides: this.nHides,
            nShows: this.nShows,
            accumShown: this.accumShown,
            accumHidden: this.accumHidden,
            timeShowingPercent: Math.ceil(100 * this.accumShown / this.relativeTimestamp(this.pageViewStart))
        })
    }
    getStats()
    {
        return this.basicStats;
    }

    onReady() {
        this.log("Basic", {pageReadyTime: this.relativeTimestamp(this.pageViewStart)});
    }

    onLoad() {
        let timings = Timing.getTimings();
        let nRemoteScripts = 0;
        if (w.document.querySelector) {
            nRemoteScripts = w.document.querySelectorAll("script[src]").length;
        }
        let w = this.w;
        let d=w.document;
        this.log("Basic", {
            bodyWidth: Compat.getPageWidth(this.w),
            bodyHeight: Compat.getPageHeight(this.w),
            nImages: d.getElementsByTagName("img").length,
            nScripts: d.getElementsByTagName("script").length,
            nVideos: d.getElementsByTagName('video').length,
            nIframes: d.getElementsByTagName('iframe').length,
            pageTransferSize: timings.transferSize || null,
            pageDecodedSize: timings.decodedBodySize || null,
            headLength: (d.head && d.head.innerHTML) ? d.head.innerHTML.length : 0,
            bodyLength: (d.body && d.body.innerHTML) ? d.body.innerHTML.length : 0,
            nRemoteScripts: nRemoteScripts
        })
    }

    relativeTimestamp(reference = 0) {
        return (new Date()).getTime() - reference;
    }

    handleScroll() {
        if (this.relativeTimestamp(this.lastScrollTime) < 1)
            return;

        let data = {}
        let temp = Compat.getYScroll();
        if (this.firstScroll == -1) {
            data.firstScroll = this.firstScroll = this.relativeTimestamp(this.pageViewStart);
        }
        if (temp > this.maxScroll) {
            data.maxScroll = this.maxScroll = temp;
        }
        this.currentScroll = temp;
        data.lastScrollTime = this.lastScrollTime = this.relativeTimestamp(this.pageViewStart);
        this.log("Scroll", data)
    }

    getLabel() {
        return "PageStats";
    }
}
