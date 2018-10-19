
import * as Browser from "../../Browser/Browser";
import * as Cookie from "../../Browser/Cookie";
import ConditionalConfig from "../../Config/ConditionalConfig"
import Evented from "../../Arch/Evented"
import AdController from "../AdController/AdController";

export default class PageManager extends Evented
{
    constructor(serviceContainer,config)
    {
        super();
        this.serviceContainer=serviceContainer;
        this.rawConfig=config;
        this.adControllers={};
        this.divCounter=0;
        this.divPrefix="SM-"+(new Date().getTime())+"-";
        this.behaviours={};
    }
    initialize()
    {
        let ps=this.serviceContainer.get("PageStats");
        var stats=ps.getStats();
        let confParser=new ConditionalConfig(this.rawConfig,
            {
                browser:Browser.browserInfo(),
                page:stats,
                getCookie:Cookie.getCookie}
                );
        this.config=confParser.parse();

        if(this.config.behaviours!==undefined)
        {
            for(let k in this.config.behaviours)
            {
                let i=this.config.behaviours[k];
                let newI=new i.type(this.serviceContainer,this,i.config);
                newI.initialize();
                this.behaviours[k]=newI;
            }
        }

        if(SmartJs!==undefined)
        {
            let slots=SmartJs.slots;
            if(slots!==undefined)
                slots.map((c)=>this.register(c.s,c.n));
            let cmd=top.SmartJs.cmd;
            top.SmartJs=this;
            cmd.map((c)=>c.apply(this));
            this.cmd={push:(c)=>c.apply(this)}
        }
    }
    register(position,node)
    {
        if(this.config.slots[position]===undefined)
            return;
        if(this.config.slots[position].enabled===false)
            return;
        // Se obtiene una referencia al ultimo js ejecutado en la pagina
        let divNode=node;
        if(divNode===undefined) {
            let domNodes = document.getElementsByTagName("script");
            let scriptNode = domNodes[domNodes.length] - 1;
            divNode = scriptNode.parentNode();
        }
        var subDivNode=document.createElement("div");

        subDivNode.id=this.divPrefix+this.divCounter;
        divNode.appendChild(subDivNode);
        this.divCounter++;

        this.adControllers[subDivNode.id]=new AdController(
            this.serviceContainer,position,subDivNode,this.config
        );
        // Fire event.
        this.adControllers[subDivNode.id].initialize();
    }
}