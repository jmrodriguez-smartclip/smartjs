import AdService from "../../Base/AdService"
import * as Common from "../../../../Common"
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise"
export default class AppNexusService extends AdService
{
    onInitialized(){
        /* Se carga la libreria js de google */
        if(window.apntag===undefined)
        {
            window.apntag={anq:[]};
        }
        this.loadPromise=SMCPromise();
        this.loaded=false;
        this.apn=window.apntag;
        this.slotFromAd={};
        if(this.config.autoload)
            this.load();
    }
    onConfigured(){
        this.apn.anq.push(
          ()=>
          {
              this.apn.setPageOpts({
                  member:this.config.member
              });
          }
        );
    }
    onReady(){}

    onEvent(id,slot,message) {

        if(this.eventsById[id]===undefined) {
            cosole.log("EVENTO DESCONOCIDO:"+id);
            return;
        }
        // Lanzar eventos para plugins.
        console.log(id+":"+this.eventsById[id]+":"+message);
    }

    requestAd(ad)
    {

    }
    displayAd(ad)
    {
        this.apn.anq.push(()=>{
            //this.apn.refresh([ad.getContainer().getId()]);
            this.apn.showTag([ad.getContainer().getId()]);
            this.apn.loadTags();
        });
    }
    configureAd(ad)
    {
        this.load();
        ad.before("Requesting").wait(this.loadPromise);
        this.apn.anq.push(()=>{
            let contId=ad.getContainer().getId();
            this.apn.defineTag({
                tagId: ad.getServiceParam("AppNexus","adunit"),
                sizes: ad.getSizes(),
                targetId: contId
            });
            let targeting=ad.getTargeting();
            this.apn.setKeywords(contId,targeting);
            this.slotFromAd[contId]=ad;
            }
        );
    }
    load()
    {
        if(this.loaded)
            return;
        this.apn.anq.push(()=> this.resolve("gptPromise"));
        Network.asyncLoad("//acdn.adnxs.com/ast/ast.js")
            .then(()=>{
                this.loaded=true;
                this.loadPromise.resolve();
            });
    }

}