import SMCPromise from "../../../../Arch/SMCPromise"
import Ad from "../../Base/Ad"
import GPTService from "./GPTService"
import isset from "../../../../Common"
import AdController from "../../../AdController/AdController"
import DivNode from "../../../Container/lib/DivNode"

export default class GPTSlave extends GPTService
{
    constructor(serviceContainer,config)
    {

        super(serviceContainer,config);
        /* displayPromises almacena una promesa que se aniade al estado Requesting de cada ad,
           que impide que pase a ese estado, hasta que no haya una llamada directa a display.
         */
        this.displayPromises={};
        this.stack=[];
        this.oldDisplay=null;
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
                        this.remapGPT();
                        this.resolve("pubads");
                        this.stack.map((e)=> {
                            googletag.cmd.push(e)

                        });
                    }catch(e)
                    {
                        this.restoreGpt();
                        this.logger.exception(this.getLabel(),"initializeStack",e);
                    }
                }
            ];
            googletag.cmd.push=(f)=>{this.stack.push(f)}
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
        try{
        let pM=this.serviceContainer.get("PageManager");
        let adM=this.serviceContainer.get("AdService");
        let divId = slot.getSlotElementId();
        let newDiv=new DivNode({id:divId});
        // Creamos un container fake
        // Por ahora, la configuracion del slot es minima.
        // Podria reenviarsele una configuracion de ad distinta.
        let conf={tags:{},slots:{}};
        let adConf={
            adProvider:"GPTSlave",
            "sizes":this.getSlotSizes(slot,1),
            "GPTSlave":{
                adunit:slot.getAdUnitPath()
            }
        }


        if(this.config.slots!==undefined)
        {
            if(this.config.slots[divId]!==undefined)
                adConf=Object.assign(adConf,this.config.slots[divId]);
        }

        conf["slots"][divId]= {
            "tags":[],
            "enabled":true,
            "ad":adConf,
            "container":{
                "type": "Simple",
                "value": {id: divId}
            }
        }



        let newController=new AdController(
            this.serviceContainer,
            divId,
            newDiv,
            conf,
            {slots:{}}
        );
        this.divCounter++;
        if(pM!==undefined)
            pM.registerAd(divId,newController);
        this.slotFromAd[divId] = slot;

        let ad=newController.getAd();
        this.displayPromises[divId]=SMCPromise();
        ad.before(Ad.STATE_READY).wait(this.displayPromises[divId]);
        newController.initialize();
        this.__adFromSlot[divId]=ad;
        return newController;
        }
        catch(e)
        {
            this.logger.exception(this.getLabel(),"importSlot",e);
            return null;
        }
    };
    remapGPT()
    {
        // Remapeo de defineSlot
        let oldDefineSlot=window.googletag.defineSlot;

        window.googletag.defineSlot=(adunit,sizes,divId)=>
        {
            let rValue=null;
            try {
                rValue = oldDefineSlot(adunit,sizes,divId)
                if(rValue==null)
                    return null;
                let ctr=this.importSlot(rValue);

                let oldDefineSizeMapping=rValue.defineSizeMapping;
                rValue.defineSizeMapping=(map)=>{
                    oldDefineSizeMapping.apply(rValue,arguments);
                    ctr.ad.setSizeMapping(mapping);
                }
            }catch(e)
            {
                this.logger.exception(this.getLabel(),"defineSlot",e);
            }

            return rValue;
        };
        if(this.oldDisplay===null) {
            this.oldDisplay = window.googletag.display;
            window.googletag.display = (divId) => {
                if (this.__adFromSlot[divId] === undefined) {
                    let slot = this.getSlotByDivId(divId);
                    if (slot)
                        this.importSlot(slot);
                    else // Todo : excepcion: se hace display de un slot no definido.
                        return;
                }
                this.displayPromises[divId].resolve();
                this.callGPTDisplay(divId)

            }
        }
        let oldRef=window.googletag.pubads().refresh;
        window.googletag.pubads().refresh=function(){
            oldRef.apply(null,arguments);
        }
        this.setupEvents();

    }
    callGPTDisplay(containerId)
    {

        this.oldDisplay(containerId);

        //this.oldDisplay(containerId);
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
    onConfigured(){}

    getSlotByDivId(divId) {
        let slots = googletag.pubads().getSlots();
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

    configureAd(ad)
    {
        return;
    }

}
