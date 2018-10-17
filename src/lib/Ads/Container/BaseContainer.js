import Promised from '../../Arch/Promised';
import SMCPromise from '../../Arch/SMCPromise';
export default class BaseContainer extends Promised{
    constructor(ContainerService,config)
    {
        super();
        this.node=null;
        this.config=config;
    }
    initialize()
    {
        this.prependPromises({"attached":"Configured","destroy":"Destroyed"});
        this.run(["Created","Attached","Configured","Ready","Destroyed"]);
    }
    onCreated()
    {

    }
    onAttached()
    {
        if(this.config.node)
        {
            this.node=this.config.node;
        }
        if(this.config.id!==undefined) {
            this.node = document.getElementById(this.config.id);
        }

    }
    onConfigured()
    {
        if(this.node)
        {
            if(typeof this.config.style!==undefined)
            {
                for(let k in this.config.style)
                    this.node.style[k]=this.config.style[k];
            }
        }
    }
    onReady()
    {

    }
    onDestroyed()
    {

    }
    attachTo(node)
    {
        this.node=node;
        this.resolve("attached");
    }
    getId()
    {
        return this.node.id;
    }
    getNode(){return this.node;}
    destroy()
    {
        this.resolve("destroy");
    }
}
