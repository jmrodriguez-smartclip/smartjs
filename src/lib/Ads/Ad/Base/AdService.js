import Service from "../../../Service/Service"
import {deepmerge} from "../../../Common"
export default class AdService extends Service
{
    static get EVENT_SERVICE_LOADED(){ return "EVENT_SERVICE_LOADED";}
    static get EVENT_SERVICE_ERROR() { return "EVENT_SERVICE_ERROR";}
    static get ADSERVICE_DISPLAY()   { return "Display";}
    static get ADSERVICE_VIDEO()     { return "Video";}


    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);
        this.registeredAds=[];
    }
    initialize()
    {
        this.prependPromises({"loaded":"Loading","destroy":"Destroyed"});
        this.run(["Created","Loading","Initialized","Configured","Ready","Destroyed"]);
    }
    createRequest(ad)
    {

    }
    getSlotConfiguration(id)
    {
        let results=[this.config.slots.default || {}];
        if(this.config.slots[id]==="undefined")
            throw "Unknown slot:"+id;
        let byIdConfig=this.config.slots[id].ad;
        results.push(byIdConfig);
        if(byIdConfig.tags)
        {
            for(var k in byIdConfig.tags)
            {
                // Crear un objeto, para permitir tests para incluir o no la
                // template (ej, a/b testing, condiciones sobre viewability,etc.
                // Permitir templates dentro de templates.
                // Las templates tambien deben permitir establecer targetings.
                if(this.config.tags[k]!==undefined)
                    results.push(this.config.tags[k]);
            }
        }
        return deepmerge.all.apply(null,results);
    }
    registerAd(ad)
    {
        this.registeredAds.push(ad);
    }
    configureAd(ad)
    {
    }
    getTagName()
    {
        return "generic";
    }
    getAdServiceType()
    {
        return AdService.ADSERVICE_DISPLAY;
    }
    destroy()
    {
        this.resolve("destroy");
    }
    getLabel()
    {
        return "AdService";
    }
    // A sobreescribir en clases derivadas
    getNativeSlot(ad)
    {
        return null;
    }
}
