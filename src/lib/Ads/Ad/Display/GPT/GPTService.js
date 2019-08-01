import AdService from "../../Base/AdService"
import * as Common from "../../../../Common"
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise"
import GPTRequest from "./GPTRequest";




export default class GPTService extends AdService {
    onCreated(){
        /* Se carga la libreria js de google */
        if (window.googletag === undefined)
            window.googletag = {
                cmd: []
            };
        this.gt = googletag;
        this.slotFromAd = {};
        this.definedSlots = {};
        this.__adFromSlot = {};

        this.load();
    }
    onInitialized() {

    }


    onConfigured() {

        this.gt.cmd.push(() => {
            //this.__log = googletag.debug_log.log;
            let m = this;
            /*googletag.debug_log.log = function (level, message, service, slot, reference) {
                if (message && message.getMessageId && typeof (message.getMessageId()) === 'number') {
                    m.onEvent(message.getMessageId(), slot, message);
                }
                return m.__log.apply(m.gt.debug_log, arguments);
            };*/
            let pads = this.gt.pubads();

            pads.addEventListener('impressionViewable', function (event) {
                m.onSlotViewable(event)
            });
            pads.addEventListener('slotRenderEnded', function (event) {
                m.onSlotRenderEnded(event)
            });
            pads.addEventListener('slotVisibilityChanged', function (event) {
                m.onSlotVisibilityChanged(event);
            });
            pads.addEventListener('slotOnload', function (event) {
                m.onSlotOnload(event);
            });
            pads.disableInitialLoad();
            pads.collapseEmptyDivs();
            this.gt.enableServices();
        });

    }

    onReady() {
    }
    requestAd(ad) {
        let r = this.createRequest(ad);
        this.displayAd(ad);
        return r;
    }

    displayAd(ad) {
        this.gt.cmd.push(() => {
            this.refreshAd(ad);
        });
    }
    refreshAd(ad) {
        this.gt.cmd.push(()=>{
            let slot=this.getNativeSlot(ad);
            if(slot)
                this.gt.pubads().refresh([slot]);
        });
    }
    getNativeSlot(ad)
    {
        return this.slotFromAd[ad.getContainer().getId()];
    }

    configureAd(_ad) {
        this.load();
        _ad.before("Requesting").wait(this.loadPromise);
        let m=this;
        if(_ad.getContainer()===null)
            debugger;


        this.gt.cmd.push(() => {

            let adslot = _ad.getServiceParam("GPT", "adunit");
            let sizes = _ad.getSizes();
            let gptSizes = _ad.getServiceParam("GPT", "sizes");
            let targeting = _ad.getTargeting();
            sizes = sizes.concat(gptSizes || []);
            let contId = _ad.getContainer().getId();
            let slot = null;

            if (this.definedSlots[contId] === undefined) {

                slot=this.gt.defineSlot(adslot, sizes, contId);
                this.definedSlots[contId] = slot;
                slot.addService(this.gt.pubads());
            }
            else {
                slot=this.slotFromAd[contId];
                slot.clearTargeting();
            }
            for (let k in targeting)
                slot.setTargeting(k, targeting[k]);
            this.slotFromAd[contId] = slot;
            this.__adFromSlot[_ad.getContainer().getId()]=_ad;
        });
    }

    load() {
        if (this.loaded)
            return;
        var useSSL = 'https:' === document.location.protocol;
        this.gt.cmd.push(() => this.resolve("gptPromise"));
        Network.asyncLoad((useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js')
            .then(() => {
                this.loaded = true;
                this.resolve("loaded");
            });
    }


    createRequest(ad) {
        return new GPTRequest(this.serviceContainer,ad,this);
    }

    onSlotViewable(event) {
        let ad = this.__adFromSlot[event.slot.getSlotElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getSlotElementId());
        let cr=ad.getCurrentRequest();
        if (cr != null)
            cr.onViewable();
    }

    onSlotRenderEnded(event) {

        let slot = event.slot;
        let ad = this.__adFromSlot[slot.getSlotElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getSlotElementId());
        let req = ad.getCurrentRequest();
        if (req == null)
            return;



            if (event.isEmpty) {
                req.onEmpty();
            }
            else {
                var m1 = event.slot.getResponseInformation();
                let szc = event.size.constructor.toString();
                let receivedSize = null;
                let isOutOfPage = slot.getOutOfPage();
                if (!isOutOfPage) {
                    if (szc.indexOf("tring") > 0)
                        receivedSize = event.size;
                    else {
                        if (szc.indexOf("rray"))
                            receivedSize = event.size[0] + "x" + event.size[1];
                    }
                }
                else
                    receivedSize = "0x0";
                req.onAdReceived(m1,receivedSize);

            }
        req.onRequestFinished();
    }

    onSlotVisibilityChanged(event) {
        let slot = event.slot;
        let ad = this.__adFromSlot[slot.getSlotElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getSlotElementId());
        if (ad.request == null)
            return;
        ad.getCurrentRequest().onVisibilityChange(event.inViewPercentage);
    }

    onSlotOnload(event) {
        let slot = event.slot;
        let ad = this.__adFromSlot[slot.getSlotElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getSlotElementId());
        if (ad.currentRequest == null) // TODO : Esto no deberia pasar...Aqui es necesaria una excepcion, y log remoto.
            return;
        ad.getCurrentRequest().onImpression();
    }


    getTagName() {
        return "DFP";
    }
    getLabel()
    {
        return "GPTService";
    }
}

