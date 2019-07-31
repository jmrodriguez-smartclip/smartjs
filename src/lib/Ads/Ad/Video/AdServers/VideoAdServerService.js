import Service from "../../../../Service/Service";
export default class VideoAdServerService extends Service
{
    onConfigured()
    {
        this.registeredAdServers=this.config.adServers;
    }
    getAdServer(config)
    {
        let adServerType=config.type;
        if(typeof this.registeredAdServers[adServerType]===undefined)
            throw "Unknown Ad Server type:"+adServerType;
        return new this.registeredAdServers[adServerType](this,config.value);
    }
    getLabel()
    {
        return "VideoAdServerService";
    }
}
