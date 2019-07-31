import Promised from "../../../Arch/Promised";
import Timing from "../../../Browser/Timing";
import * as Common from "../../../Common";
import Ad from "./Ad";
import LogHelper from "../../../Log/LogHelper"
import UUID from "../../../Browser/UUID";
export default class AdRequest extends Promised {
    constructor(serviceContainer,ad,adServer)
    {
        super(serviceContainer);
        this.ad = ad;
        this.adid = ad.id;
        this.requestId=UUID();
        this.type=this.getType();
        this.creationTime=Timing.timestamp();
        this.log("CREATED",{
            creationTime:this.creationTime,
            creationLocalTime:this.toRelative()
        });
        this.viewable=false;
        this.loaded=false;
        this.gotImpression=false;
        this.requested=false;
        this.empty=false;


    }
    onRequested() {
        this.requested=true;
        this.log("UPDATE",{
            requestSentTime:Timing.relative(),
            requestSentLocalTime:this.toRelative()
        });
        this.ad.fireEvent(Ad.EVENT_SLOT_REQUESTED,{ad:this.ad,request:this});
    }

    onViewable()
    {
        this.viewable=true;
        this.log("UPDATE",{
            viewable:true,
            viewableTime:Timing.relative(),
            viewableLocalTime:this.toRelative()
        })
        this.ad.fireEvent(Ad.EVENT_SLOT_VISIBLE, {ad: this.ad,request:this});
    }

    onStart()
    {
        this.ad.setDisplayed();
        this.log("UPDATE",{
            displayStartTime:Timing.relative(),
            displayLocalTime:this.toRelative()
        })
    }
    onEmpty()
    {
        this.empty=true;
        this.ad.setEmpty();
        this.ad.fireEvent(Ad.EVENT_AD_EMPTY, {ad: this.ad});
        this.log("UPDATE",{"isEmpty":true})

    }
    // En Display, onAdReceived tambien dispara onStart y onImpression
    onAdReceived()
    {
        this.loaded=true;
        this.ad.setLoaded();
        this.fireEvent(Ad.EVENT_AD_AVAILABLE, {slot: this});
    }
    onVisibilityChange(percent)
    {
        this.ad.fireEvent(Ad.EVENT_VISIBILITY_CHANGE,{ad:this.ad,req:this,visibility:percent});
        this.log("UPDATE",{"visiblePercent":percent});
    }
    // Cuando se llama onRequestFinished, o previamente se ha llamado a onAdReceived,
    // o se ha llamado a onEmpty. La idea es que ya se conoce el estado del anuncio.
    onRequestFinished()
    {
        this.log("UPDATE",{
            loadTime: Timing.relative(),
            localLoadTime: this.toRelative()
        });
    }
    onImpression()
    {
        this.ad.gotImpression();
        this.log("UPDATE",{
            impressionTime: Timing.relative(),
            impressionLocalTime: this.toRelative()
        });
    }
    onFinished()
    {
        this.log("UPDATE",{
            finished:true,
            finishedTime: Timing.relative(),
            finishedLocalTime:this.toRelative()
        })
        this.ad.fireEvent(Ad.EVENT_AD_FINISHED, {ad:this.ad,req:this});
    }
    onClick()
    {
        this.ad.fireEvent(Ad.EVENT_AD_CLICKED,{ad:this.ad,req:this});
        this.log("UPDATE",{"clicked":true});
    }
    onError(errorCode,errorString)
    {
        this.log("UPDATE",{
            errored:true,
            errorString:errorString,
            errorCode:errorCode
        })
        this.ad.fireEvent(Ad.EVENT_AD_ERROR,{ad:this.ad,req:this,errorString:errorString,errorCode:errorCode});
    }

    // A sobreescribir en derivadas
    getType()
    {
        return "<Unknown>";
    }
    log(type,data)
    {
        let message={
                "adId":this.adid,
                "type":type,
                "data":data
        };
        this.logger.log("INFO","ADREQUEST",this.requestId,message);
    }

    toRelative() {
        return Timing.relative() - this.creationTime;
    }

}
