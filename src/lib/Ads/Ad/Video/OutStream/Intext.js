import AdService from "../../Base/AdService";
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise";

export default class Ava extends AdService
{
    onInitialized(){
        this.loaded=false;
        this.loadPromise=SMCPromise();

    }
    onConfigured(){
    }
    onReady(){}

    onEvent(id,slot,message) {
    }
    requestAd(ad)
    {
        let plc=ad.getServiceParam("Intext","plc");
        let contId=ad.getContainer().getId();
        ad.before("Displaying").wait(this.loadPromise);
        Network.asyncLoad("https://des.smartclip.net/ads?type=dyn&sz=400x320&rnd=94632936&plc="+plc+"&elementId="+contId).then(()=>{
            this.loadPromise.resolve();
        });
    }
    displayAd(ad)
    {


    }
    configureAd(ad)
    {

    }

}

