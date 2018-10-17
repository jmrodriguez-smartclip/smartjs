/** SERVICECONTAINER_IMPORTS **/
export default class ServiceContainer
{
    constructor(serviceSpec)
    {
        this.spec=serviceSpec;
        this.services={};

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
    find(serviceName)
    {

    }

}