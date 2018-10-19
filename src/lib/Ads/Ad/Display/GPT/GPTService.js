import AdService from "../../Base/AdService"
import * as Common from "../../../../Common"
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise"
export default class GPTService extends AdService
{
    onInitialized(){
        /* Se carga la libreria js de google */
        if(window.googletag===undefined)
            window.googletag = {
                cmd: []
            };
        this.loadPromise=SMCPromise();
        this.loaded=false;
        this.gt=googletag;
        this.slotFromAd={};
        if(this.config.autoload)
            this.load();

        this.events =
            {
                PAGE_LOAD_COMPLETE: 1,
                SLOT_CREATE: 2,
                SLOT_FETCH: 3,
                SLOT_RECEIVING: 4,
                SLOT_RENDERING: 5,
                SLOT_RENDERED: 6,
                GOOGLE_JS_LOADED: 8,
                DEFINE_ATTRIBUTE: 9,
                DEFINE_POSTATTRIBUTE: 10,
                WARN_SLOT_ALREADY_ASSOCIATED: 12,
                ERR_SIZE_ASSIGN: 13,
                DEFINE_CATEGORY_EXCLUSION: 14,
                REMOVE_CATEGORY_EXCLUSION: 16,
                DEFINE_SEGMENT_ATTRIBUTE: 17,
                REMOVE_SEGMENT_ATTRIBUTE: 19,
                WARN_IGNORE_COLLAPSE: 20,
                ERR_CANT_WRITE_SLOT: 21,
                ERR_CANT_FIND_DIV: 22,
                ERR_CANT_FIND_DIV_SLOT: 23,
                ERR_UNKNOWN_DISPLAY_DIV: 26,
                ERR_UNASSIGNED_DIV_DISPLAY: 27,
                ERR_ALREADY_ASSIGNED_DIV: 28,
                ERR_FUNCTION_EXCEPTION: 30,
                QUEUE_FUNC_INVOKED: 31,
                ERR_INVALID_SIZE_ASSIGMENT: 34,
                SERVICE_CREATED: 35,
                DEFINE_SERVICE_ATTRIBUTE: 36,
                ERR_DEFINE_SERVICE_ATTRIBUTE: 37,
                SERVICE_ALREADY_ENABLED: 38,
                ERR_CANT_ENABLE_SERVICE: 39,
                SERVICE_ADD_SLOT: 40,
                ERR_INVALID_AD_SIZE: 41,
                ERR_ROADBLOCK: 42,
                ERR_SERVICE_NOT_ENABLED: 43,
                ERR_CANT_CHECK_ROADBLOCK: 44,
                ERR_CANT_FIND_SLOT: 45,
                GPT_FETCH: 46,
                ERR_GPT_FETCH: 47,
                GPT_FETCHED: 48,
                ERR_CANT_UPDATE: 49,
                FILL_SLOT: 50,
                ERR_SYNC_CALL_AFTER_LOAD: 52,
                AD_RENDER_DELAYED: 53,
                PASSBACK_DELAYED: 54,
                AD_RENDER_AVOIDED: 55,
                ERR_SLOT_NAME: 56,
                WARN_UNKNOWN_PUBADS_ATTRIBUTE: 57,
                WARN_UNKNOWN_SLOT_ATTRIBUTE: 58,
                ERR_COOKIE_OPTIONS: 59,
                WARN_SERVICE_ENABLED_1: 60,
                WARN_SERVICE_ENABLED_2: 61,
                WARN_SERVICE_ENABLED_3: 62,
                SET_RENDER_MODE: 63,
                DEFINE: 64,
                ERR_NO_VALID_SLOT_FOUND: 65,
                WARN_REFRESH_GPT_NOT_LOADED: 66,
                WARN_NO_REFRESH_GPT_NOT_LOADED: 67,
                WARN_SLOT_CLEAR_GPT_NOT_LOADED: 68,
                UPDATE_QUEUED: 69,
                UPDATING_ADS: 70,
                CLEARING_ADS: 71,
                REMOVING_NO_REFRESH: 72,
                ERR_MUST_BE_MATRIX: 73,
                ERR_MUST_BE_BOOLEAN: 74,
                ERR_MUST_BE_NUMBER: 75,
                ERR_MUST_BE_STRING: 76,
                WARN_LOCATION_TRUNCATED:77,
                COLLAPSE_DIVS_ENABLED:78,
                WARN_COLLAPSE_DIVS_CONFIGURED:79,
                ERR_INVALID_SLOT_IN_POSITION:80,
                REMOVE_SEGMENT_ATTRIBUTE_2:82,
                WARN_CANT_FIND_SEGMENT_ATTRIBUTE:84,
                CATEGORY_EXCLUSION_DEFINED:85,
                CATEGORY_EXCLUSIONS_REMOVED:87,
                SERVICE_ATTRIBUTE_DEFINED:88,
                ERR_INVALID_TAG_TYPE:90,
                ERR_EXCEPTION_IN_EVENT_HANDLER:92,
                ERR_UNKNOWN_EVENT:93,
                ERR_UNKNOWN_SERVICE_FOR_SLOT:94,
                ERR_CORRELATOR: 95,
                ERR_INVALID_ARGUMENTS:96,
                ERR_INVALID_CHILDSAFE_TYPE:97,
                ERR_OAS: 98,
                SLOT_DESTROYED:99,
                ERR_INVALID_SAFEFRAME_ATTR:100,
                ERR_INVALID_SAFEFRAME_VALUE:101,
                WARN_CANT_FIND_SLOT_SEGMENT_ATTRIBUTE:102,
                SEGMENT_ATTRIBUTE_REMOVED:103,
                SEGMENT_ATTRIBUTES_CLEARED:104,

                SLOT_REFRESH_REQUESTED: 1000,
                EVENT_SLOT_VIEWABLE:1001,
                EVENT_SLOT_VIEWABILITY_CHANGED:1002,
                EVENT_SLOT_RENDERED:1003
            };
        this.eventsById={};
        for(var k in this.events)
            this.eventsById[this.events[k]]=k;

    }
    onConfigured(){
        this.gt.cmd.push(()=>{
        this.__log = googletag.debug_log.log;
        var m=this;
        googletag.debug_log.log = function (level, message, service, slot, reference) {
            if (message && message.getMessageId && typeof (message.getMessageId()) === 'number') {
                m.onEvent(message.getMessageId(), slot, message);
            }
            return m.__log.apply(m.gt.debug_log, arguments);
        };

        this.pads=this.gt.pubads();
        m.gt.pubads().collapseEmptyDivs();
        this.gt.enableServices();
        });

    }
    onReady(){}

    onEvent(id,slot,message) {

        if(this.eventsById[id]===undefined) {
            cosole.log("EVENTO DESCONOCIDO:"+id);
            return;
        }
        // Lanzar eventos para plugins.
        console.log(id+":"+this.eventsById[id]+":"+message);
    }

    requestAd(ad)
    {

    }
    displayAd(ad)
    {
        this.gt.cmd.push(()=>{
        this.gt.display(ad.getContainer().getId());
        });
    }
    configureAd(ad)
    {
        this.load();
        ad.before("Requesting").wait(this.loadPromise);
        this.gt.cmd.push(()=>{
            let adslot=ad.getServiceParam("GPT","adunit");
            let sizes=ad.getSizes();
            let gptSizes=ad.getServiceParam("GPT","sizes");
            let targeting=ad.getTargeting();
            sizes=sizes.concat(gptSizes || []);
            let contId=ad.getContainer().getId();
            let slot=this.gt.defineSlot(adslot,sizes,contId);
            for(let k in targeting)
                slot.setTargeting(k,targeting[k]);
            slot.addService(this.pads);
            this.slotFromAd[contId]=slot;
        });
    }
    load()
    {
        if(this.loaded)
            return;
        var useSSL = 'https:' === document.location.protocol;
        this.gt.cmd.push(()=> this.resolve("gptPromise"));
        Network.asyncLoad((useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js')
            .then(()=>{
                this.loaded=true;
                this.loadPromise.resolve();
            });
    }

}