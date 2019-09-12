import Promised from '../../Arch/Promised'
import Ad from '../Ad/Base/Ad'
import * as Common from "../../Common";

export default class AdController extends Promised
{
    constructor(serviceContainer,slotid,DivNode,adConfig)
    {
        super(serviceContainer);

        this.slotId=slotid;
        this.config=adConfig;
        this.domNode=DivNode;
        this.serviceContainer=serviceContainer;
        this.persistedData={};
        this.mergeTags();
        this.container=this.serviceContainer.get("Container").getContainer(this.slotConfig.container);
        this.buildAd();
    }
    initialize()
    {
        this.prependPromises({"destroy":"Destroyed"});
        //this.slotConfig.container.value.node=this.domNode;

        this.before("Initialize").wait(this.domNode.getPromise());
        this.run(["Initialize","Run","Destroyed"])
    }
    onInitialize()
    {
        this.container.attachTo(this.domNode.getNode());
        this.container.initialize();
        this.initializeAd();
    }

    onRun()
    {


    }
    buildAd()
    {
        this.ad=new Ad(this.serviceContainer,this,this.slotId,this.slotConfig,this.config);
    }
    getAd()
    {
        return this.ad;
    }
    initializeAd()
    {
        this.ad.initialize();
        this.ad.attach(this.container);
        this.container.setAd(this.ad);
    }
    mergeTags()
    {

        this.slotConfig = Common.deepmerge({},this.config.slots[this.slotId]);
        if(this.config.slots[this.slotId].tags===undefined) {
            return;
        }
        this.slotConfig.tags.map((tag)=>{
            if(this.config.tags[tag]!==undefined) {
                this.slotConfig = Common.deepmerge(this.slotConfig,this.config.tags[tag]);
            }
        });
        if(this.config.globalSlot!==undefined)
        {
            this.slotConfig=Common.deepmerge(this.slotConfig,this.cofig.globalSlot);
        }
    }
    reloadAd()
    {
        if(this.ad)
        {
            this.ad.destroy();
        }
        this.buildAd();
        this.initializeAd();
    }
    persist(source,data)
    {
        this.persistedData[source]=data;
    }
    retrieve(source)
    {
        if(this.persistedData[source]===undefined)
            return null;
        return this.persistedData[source];
    }
    getLabel()
    {
        return "AdController";
    }
    destroy()
    {
        this.resolve("destroy");
    }

}
