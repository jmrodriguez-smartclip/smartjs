/** SERVICECONTAINER_IMPORTS **/
import SMCPromise from "../Arch/SMCPromise"
export default class ServiceContainer
{
    constructor(serviceSpec)
    {
        this.spec=serviceSpec;
        this.services={};
        this.servicesLoadedPromise=SMCPromise();
    }

    initialize()
    {
        /** SERVICECONTAINER_INITIALIZE **/
    }
    // serviceList esta en la forma: {"<nombre servicio>":{instance:<Modulo importado>,config:{...}}
    loadServices(serviceList)
    {
        for(let k in serviceList)
        {
            this.services[k]=new (serviceList[k].instance)(this,serviceList[k].config);
        }
        this.servicesLoadedPromise.resolve();
        for(let k in this.services)
        {
            this.services[k].initialize();
        }
    }
    get(serviceName)
    {
        if(typeof this.services[serviceName] === undefined)
            throw "Unknown service :"+serviceName;
        return this.services[serviceName];
    }
    add(serviceName,service)
    {
        this.services[serviceName]=service;
    }
    append(serviceName,serviceConfig)
    {

        this.services[serviceName]=new (serviceConfig.instance)(this,serviceConfig.config);
        this.servicesLoadedPromise.then(()=>{this.services[serviceName].initialize()})
    }
    getLoadedPromise()
    {
        return this.servicesLoadedPromise;
    }
}
