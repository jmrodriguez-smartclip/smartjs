import BaseAdServer from "../BaseAdServer";

export default class Smartclip extends BaseAdServer
{
    getVastUrl(ad,videoPlayer)
    {
        return 'https://ad.sxp.smartclip.net/select?type=dyn&ple='+
        this.config.ple+"&cu_rmtdom=&smar_fc=req&smar_cors=0&fwd_dt1=&fwd_dt2=&ref="+
        encodeURIComponent(document.location.href)+"&fwd_sz=400x320&&rnd="+Math.random();
    }
}