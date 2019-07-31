import Promised from "../../../Arch/Promised"
export default class AdBehaviour extends Promised
{
    constructor(serviceContainer,ad,config)
    {
        super(serviceContainer)
        this.ad=ad;
        this.config=config;
        this.serviceContainer=serviceContainer;
    }
    initialize()
    {

        this.run(["Initialized","Configured","Ready"]);
    }
    destroy()
    {

    }
    getLabel()
    {
        return "AdBehaviour";
    }
}
