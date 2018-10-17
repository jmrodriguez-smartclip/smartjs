import Service from "../../../Service/Service"
import {deepmerge} from "../../../Common"
export default class AdService extends Service
{
    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);
        this.registeredAds=[];
    }
    initialize()
    {
        this.prependPromises({"ready":"Ready"});
        this.run(["Initialized","Configured","Ready"]);
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
}