import AdRequest from "../Base/AdRequest"
import Ad from "../Base/Ad"
export default class AdVideoRequest extends  AdRequest {
    constructor(serviceContainer,ad,adServer)
    {
        super(serviceContainer,ad,adServer)
        this.log("UPDATE",
        {
            videoPaused:false,
            videoResumed:false,
            videoViewThru:false,
            videoFirstQuartile:false,
            videoMidPoint:false,
            videoThirdQuartile:false
        });

    }
    onPause()
    {
        this.ad.fireEvent(Ad.EVENT_AD_PAUSED,{ad:this.ad,req:this});
        this.log("UPDATE",{"videoPaused":true});
    }
    onResume()
    {
        this.ad.fireEvent(Ad.EVENT_AD_RESUMED,{ad:this.ad,req:this});
        this.log("UPDATE",{"videoResumed":true});
    }
    onViewThru()
    {
        this.ad.fireEvent(Ad.EVENT_AD_VIEWTHRU,{ad:this.ad,req:this})
        this.log("UPDATE",{"videoViewThru":true});
    }
    onFirstQuartile()
    {
        this.ad.fireEvent(Ad.EVENT_AD_FIRST_QUARTILE,{ad:this.ad,req:this})
        this.log("UPDATE",{"videoFirstQuartile":true});
    }
    onMidPoint()
    {
        this.ad.fireEvent(Ad.EVENT_AD_MIDPOINT,{ad:this.ad,req:this})
        this.log("UPDATE",{"videoMidPoint":true});

    }
    onThirdQuartile()
    {
        this.ad.fireEvent(Ad.EVENT_AD_THIRD_QUARTILE,{ad:this.ad,req:this})
        this.log("UPDATE",{"videoThirdQuartile":true});
    }
    getType()
    {
        return "Video";
    }
}
