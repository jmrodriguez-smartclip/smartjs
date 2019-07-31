import AdBehaviour from '../Base/AdBehaviour';
import Ad from '../Base/Ad';
export default class Reloader extends AdBehaviour
{
    initialize()
    {
        let data=this.ad.getController().retrieve("Reloader");
        if(data!==null)
        {
            this.nReloads=data.nReloads;
            this.nBlankReloads=data.nBlankReloads;
        }
        else
        {
            this.nReloads=0;
            this.nBlankReloads=0;
        }

        this.hasBeenVisible=false;
        this.hasFinished=false;
        this.reloading=false;
        this.ad.addListener(Ad.EVENT_SLOT_VISIBLE,()=>{
            this.hasBeenVisible=true;
            this.checkReload();
        });
        let f=()=>{
            this.hasFinished=true;
            this.checkReload();
        };

        let f1=()=>{this.checkForceReload();}
        this.ad.addListener(Ad.EVENT_AD_EMPTY,()=>f1);
        this.ad.addListener(Ad.EVENT_AD_ERROR,()=>f1);
        this.ad.addListener(Ad.EVENT_AD_FINISHED,()=>f1);

        this.ad.waitFinished(Ad.STATE_READY).then(f);
        this.ad.waitFinished(Ad.STATE_DESTROYED).then(f);
        super.initialize()
    }
    checkReload()
    {
        if(!this.hasBeenVisible || !this.hasFinished || this.reloading)
            return;
        if(this.config.maxReloads!==undefined &&
            this.config.maxReloads===this.nReloads)
            return;
        this.reloading=true;
        setTimeout(()=>{
            this.reloading=false;
            this.nReloads++;
            this.ad.reload();

        },this.config.timeout);
    }
    checkForceReload()
    {
        if(this.config.maxBlankReloads!==undefined && this.config.maxBlankReloads===this.nBlankReloads)
            return;
        this.reloading=true;
        setTimeout(()=>{
            this.reloading=false;
            this.nBlankReloads++;
            this.ad.reload();

        },this.config.blankTimeout);

    }
    destroy()
    {
        this.ad.getController().persist("Reloader",{"nReloads":this.nReloads,"nBlankReloads":this.nBlankReloads});
    }
    getLabel()
    {
        return "ReloaderBehaviour";
    }
}
