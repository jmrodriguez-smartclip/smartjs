import AdDisplayRequest from "../AdDisplayRequest"
export default class GPTRequest extends AdDisplayRequest
{
    onAdReceived(responseInformation,receivedSize)
    {
        let ri=responseInformation;
        let ns=this.ad.getNativeSlot();
        this.log("UPDATE",{
            "isBackfill":ri.isBackfill,
            "serviceName":ri.serviceName,
            "isOutOfPage":ns.getOutOfPage(),
            "isFirstLook":ns.getFirstLook() == 0 ? false : true,
            "advertiserId":ri.advertiserId,
            "campaignId":ri.campaignId,
            "creativeId":ri.creativeId,
            "lineItemId":ri.lineItemId,
            "universalCreativeId":ri.sourceAgnosticCreativeId,
            "universalLineItemId":ri.sourceAgnosticLineItemId,
            "receivedSize":receivedSize,
        });
        super.onAdReceived()
    }

    onError()
    {
        console.log("Error  ed 2");
    }

    onSlotVisibilityChange(inViewPercentage)
    {

    }
}
