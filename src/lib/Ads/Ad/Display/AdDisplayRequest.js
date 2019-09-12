import AdRequest from "../Base/AdRequest";
import Timing from "../../../Browser/Timing";
import * as Common from "../../../Common";
import Ad from "../Base/Ad";

export default class AdDisplayRequest extends AdRequest {
    constructor(serviceContainer, ad,adServer) {
        super(serviceContainer,ad,adServer);
       // this.logHelper=new LogHelper(serviceContainer,module,identifier,this)
       // this.logger=serviceContainer.get("Logger");
        var sizes = this.ad.getSizes();
        if(typeof sizes[0]==="number")
            sizes=[sizes];

        let definedSizes = sizes.map(function (i) {
            if (Common.isArray(i))
                return i[0] + 'x' + i[1];
            if (Common.isString(i))
                return i;
            return ""
        }).sort().join(",");
        this.log("UPDATE",{
            definedSizes:definedSizes
        })

    }

    onAdReceived()
    {
        super.onAdReceived();
        this.onStart();
        this.onImpression();
    }

    getLabel(){return "AdDisplayRequest"};
    getType(){return "Display"}

}
