import Service from '../../Service/Service';
export default class ContainerService extends Service {
    onConfigured()
    {
        this.registeredContainers=this.config.containers;
    }
    onReady()
    {

    }
    registerContainer(type,module)
    {
        this.registeredContainers[type]=module;
    }
    getContainer(config)
    {
        let containerType=config.type;
        if(typeof this.registeredContainers[containerType]===undefined)
            throw "Unknown Container type:"+containerType;
        return new this.registeredContainers[containerType](this,config.value);
    }
    getLabel()
    {
        return "ContainerService";
    }
    getBehaviour(config,container)
    {
        return new this.config.behaviours[config.type](this.serviceContainer,container,config);
    }
}
