import GPTService from "./GPTService"
import isset from "../../../../Common"
import AdController from "../../../AdController/AdController"

export default class GPTSlave extends GPTService
{
    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);

        this.stack=[];
        this.oldCmd=null;
        this.gpt=null;
        this.divCounter=0;
        Object.defineProperty(window,"googletag",{
            get:()=>{return this.gpt;},
            set:(v)=>{
                if(this.gpt===null || this.gpt.apiReady===undefined) {
                    this.gpt = v;
                    if(v.apiReady!==undefined)
                        this.remapGPT();
                }
            }
            });
        if(window.googletag==null){
            window.googletag = {cmd: []};
            this.initializeStack(true);
        }
        else {
            // Ya existe googletag...Hasta donde hemos llegado?
            if(window.googletag.apiReady===undefined)
            {
                // Si no existe apiReady, gpt no se ha cargado, pero es posible que ya
                // haya algo metido en googletag.cmd. Hay que procesarlo:
                this.initializeStack(true);
            }
            else
            {
                if(window.googletag.apiReady===false)
                {
                    // Aun no se ha cargado pubads..Muy posiblemente ya hay cosas en el stack
                    this.initializeStack(true)
                }
                else
                {
                    // Ya esta cargado pubads.. Tenemos que resolver inmediatamente la promesa de pubads..
                    this.initializeStack(false);
                }
            }
        }
    }
    initializeStack(resolvePubadsPromise)
    {
        if(Array.isArray(googletag.cmd))
        {
            googletag.cmd.map((el)=>this.stack.push(el));
            googletag.cmd=[
                ()=>{
                    try {
                        this.resolve("pubads");
                        this.oldCmd=googletag.cmd;
                        googletag.cmd=(f)=>{this.parseCommand(f)}

                    }catch(e)
                    {
                        this.restoreGpt();
                        this.logger.exception(this.getLabel(),"initializeStack",e);
                    }
                }
            ];
            googletag.cmd.push=(f)=>{this.stack.push(el)}
        }
        else
        {
            // googletag.cmd no es un array.Esto significa que ya se han comenzado a definir slots, y, posiblemente,
            // se ha llamado a display de alguno.
            window.googletag.cmd.push(()=>{
                window.googletag.pubads().getSlots().map((i)=>{
                    this.importSlot(i);
                })
            })
        }
        if(resolvePubadsPromise)
            this.resolve("pubads");
    }

    importSlot(slot, message,evType)
    {
        let pM=this.serviceContainer.get("PageManager");
        let adM=this.serviceContainer.get("AdService");
        let divId = slot.getSlotElementId();
        let newDiv=new DivNode({id:divId});
        // Creamos un container fake
        // Por ahora, la configuracion del slot es minima.
        // Podria reenviarsele una configuracion de ad distinta.
        let newController=new AdController(
            this.serviceContainer,
            this.divCounter,
            newDiv,
            {
                "ad":{
                    adProvider:"GPTSlave",
                    "sizes":this.getSizes(slot,1),
                    "GPTSlave":{
                        adunit:slot.getAdUnitPath()
                    }
                },
                "container":{
                    "type":"Simple",
                    "value":{id:divId}
                }
            }
        );
        this.divCounter++;
        pM.registerAd(divId,newController);
        newController.initialize();
        return newController;
    };
    remapGPT()
    {
        // Remapeo de defineSlot
        let oldDefineSlot=window.googletag.defineSlot;

        window.googletag.defineSlot=()=>
        {
            try {
                let rValue = oldDefineSlot.apply(null, arguments);
                if(!rValue==null)
                    return null;
                let ctr=this.importSlot(rValue);

                let oldDefineSizeMapping=rValue.defineSizeMapping;
                rValue.defineSizeMapping=(map)=>{
                    oldDefineSizeMapping.apply(rValue,arguments);
                    ctr.ad.setSizeMapping(mapping);
                }
            }catch(e)
            {

            }

            return rValue;
        };
    }

    getSlotSizes(slot,mode)
    {
        let sizes = slot.getSizes();
        let result=[];
        sizes.map(function (cSize) {
            if (cSize.getWidth) {
                if(mode===undefined || mode==0)
                result.push(cSize.getWidth() + "x" + cSize.getHeight());
                else
                result.push([cSize.getWidth(),cSize.getHeight()]);
        }
            else
                result.push(cSize);
        })
        return result;
    }

    initialize()
    {
        this.prependPromises({
            "pubads":"Configured",
            "display":"Ready"
        })
        super.initialize();
    }

    onConfigured()
    {
        super.onConfigured()
    }

    onReady() {
        this.stack.map((code)=>{

        });
        super.onReady();
    }

    getSlotByDivId(divId) {
        let slots = top.googletag.pubads().getSlots();
        for (let k = 0; k < slots.length; k++) {
            let id = slots[k].getSlotElementId();
            if (id == divId) return slots[k];
        }
        return null;
    }

    getGptTargeting() {
        let lP = SMCPromise();
        this.isInState("Configured").then(() => {
            let pads = window.googletag.pubads();
            let returned = {};
            pads.getTargetingKeys().map(function (i) {
                if (isset(i))
                    returned[i] = pads.getTargeting(i)[0];
            });
            pads.getSlots().map(function (slot) {
                slot.getTargetingKeys().map(function (i) {
                    if (isset(i) && !isset(returned[i])) returned[i] = slot.getTargeting(i).join(",");
                });
            });
            lP.resolve(returned);
        });
        return lP;
    }

}
