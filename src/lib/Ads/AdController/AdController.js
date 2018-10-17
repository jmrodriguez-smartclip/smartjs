import Promised from '../../Arch/Promised'
import Ad from '../Ad/Base/Ad'
import * as Common from "../../Common";
/* Configuracion :
  {
     tags:{sizes:}
     slots:{
             "default":{}
             "id1":{
                tags:[],
                container:{type:...},
                ad:{
                    sizes:...
                    targeting:...
                    "GPT":{
                            "sizes"...
                            "adunit"...
                          }
                    }
                }
             ...
             ...


 */
export default class AdController extends Promised
{
    constructor(serviceContainer,slotid,node,adConfig)
    {
        super();
        this.slotId=slotid;
        this.config=adConfig;
        this.domNode=node;
        this.serviceContainer=serviceContainer;
        this.mergeTags();
    }
    initialize()
    {
        this.container=this.serviceContainer.get("Container").getContainer(this.slotConfig.container);
        this.ad=new Ad(this.serviceContainer,this.slotId,this.slotConfig,this.config);
        this.run(["Initialize","Run"])
    }
    onInitialize()
    {
        this.ad.attach(this.container);
        this.container.attachTo(this.domNode);
        this.container.initialize();
        this.ad.initialize();
    }
    onRun()
    {


    }
    mergeTags()
    {
        this.slotConfig = Common.deepmerge({},this.config.slots[this.slotId]);
        if(this.config.slots[this.slotId].tags==undefined) {
            return;
        }
        this.slotConfig.tags.map((tag)=>{
            if(this.config.tags[tag]!==undefined) {
                this.slotConfig = Common.deepmerge(this.slotConfig,this.config.tags[tag]);
            }
        })
    }
}
