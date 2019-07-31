import Promised from '../Arch/Promised';
import UUID from '../Browser/UUID';
export default class Service extends Promised {
    constructor(serviceContainer,config) {
        super(serviceContainer);
        this.serviceContainer=serviceContainer;
        this.config=config;
        this.serviceContainer.getLoadedPromise().then(()=>{this.logger=this.serviceContainer.get("Log");})

    }

    initialize()
    {
        this.run(["Configured","Ready"]);
    }
    onConfigured(){}
    onReady(){}
    getService(name)
    {
        return this.serviceContainer.get(name);
    }
    findService(name)
    {
        return this.serviceContainer.get(name);
    }
    getContainer()
    {
        return this.serviceContainer;
    }
    getLabel()
    {
       return "Service";
    }
}
