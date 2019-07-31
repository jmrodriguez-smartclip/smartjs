import Promised from "../../../Arch/Promised"
export default class ContainerBehaviour extends Promised
{
    constructor(serviceContainer, container, config) {
        super(serviceContainer)
        this.container = container;
        this.config = config;
        this.serviceContainer = serviceContainer;

    }
    initialize()
    {
        this.prependPromises({
            "destroy":"Destroy"
        });
        this.run(["Initialized","Configured","Ready","Run","Destroy"])
    }
    getLabel()
    {
        return "ContainerBehaviour";
    }
    destroy() {
        this.resolve("destroy");
    }
}
