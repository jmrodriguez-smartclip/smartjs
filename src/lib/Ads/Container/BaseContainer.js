import Promised from '../../Arch/Promised';
import DivNode from './lib/DivNode';
import SMCPromise from '../../Arch/SMCPromise';


export default class BaseContainer extends Promised{
    constructor(ContainerService,config)
    {
        super(ContainerService.serviceContainer);
        this.divNode=null;
        this.config=config;
        this.configured=false;
        this.containerService=ContainerService;
        this.behaviours=[];
        this.behaviourInstances={};
    }
    initialize()
    {
        this.prependPromises(
            {
                "gotAd":"AdConfigured",
                "attached":"Configured",
                "adConfigured":"AdConfigured",
                "destroy":"Destroyed"
            });
        this.run(["Created","Attached","Configured","AdConfigured","Ready","Destroyed"]);
    }
    onCreated()
    {
        this.divNode=new DivNode(this.config);
    }
    onAttached()
    {

    }
    onConfigured()
    {
        this.configured=true;
        if(this.divNode &&typeof this.config.style!==undefined)
            this.divNode.applyStyles(this.config.style);

    }
    // Aqui debe llamar el Ad cuando él ha terminado de configurar el container.
    setAdConfigured()
    {
        this.resolve("adConfigured");
    }
    // Aqui, el ad ya ha configurado el container, por lo que se pueden inicializar los
    // behaviours.
    onAdConfigured()
    {
        this.behaviours.map((k)=>this.addBehaviour(k))
    }
    // A este estado solo se llegara cuando todos los behaviours esten listos.
    onReady()
    {

    }
    onDestroyed()
    {

    }
    attachTo(node)
    {
        this.config.node=node;
        this.resolve("attached");
    }
    getId()
    {
        return this.divNode.getId();
    }
    getNode(){return this.divNode;}
    destroy()
    {

        this.resolve("destroy");
    }
    setAd(ad)
    {
        this.ad=ad;
        this.resolve("gotAd");
    }
    getLabel()
    {
        return "BaseContainer"
    }
    addBehaviour(beh)
    {
        if(!this.configured)
            this.behaviours.push(beh);
        else
        {
            let behaviour=this.containerService.getBehaviour(beh,this);
            this.before("Ready").wait(behaviour.isInState("Ready"));
            behaviour.initialize();
            this.behaviourInstances[beh.type]=behaviour;
        }
    }
    getBehaviour(type)
    {
        return this.behaviourInstances[type];
    }
    removeBehaviour(instance)
    {
        for(let k in this.behaviourInstances)
        {
            if(this.behaviourInstances[k]==instance)
                delete this.behaviourInstances[k];
        }
    }
}
