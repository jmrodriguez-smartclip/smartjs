import Promised from '../Arch/Promised';
export default class Service extends Promised {
    constructor(serviceContainer,config) {
        super();
        this.config=config;
        this.serviceContainer=serviceContainer;
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
}