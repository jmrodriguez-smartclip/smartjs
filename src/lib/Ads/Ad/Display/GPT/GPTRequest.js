import AdDisplayRequest from "../AdDisplayRequest"
export default class GPTRequest extends AdDisplayRequest
{
    onAdReceived(responseInformation,receivedSize)
    {

        let ri=responseInformation;
        let ns=this.ad.getNativeSlot();
        this.log("UPDATE",{
            "GPT_isBackfill":ri.isBackfill,
            "GPT_serviceName":ri.serviceName,
            "GPT_isOutOfPage":ns.getOutOfPage(),
            "GPT_isFirstLook":ns.getFirstLook() == 0 ? false : true,
            "GPT_advertiserId":ri.advertiserId,
            "GPT_campaignId":ri.campaignId,
            "GPT_creativeId":ri.creativeId,
            "GPT_lineItemId":ri.lineItemId,
            "GPT_universalCreativeId":ri.sourceAgnosticCreativeId,
            "GPT_universalLineItemId":ri.sourceAgnosticLineItemId,
            "GPT_receivedSize":receivedSize,
            "GPT_qemQueryID":ns.getEscapedQemQueryId()
        });
        super.onAdReceived()
    }
    getBasicInformation(prevData)
    {

        let slot=this.adServer.getNativeSlot(this.ad);
        let placement=slot.getAdUnitPath();
        let nId=placement.split("/")[1];

        return Object.assign(prevData,{
            GPT_placement:slot.getAdUnitPath(),
            GPT_network:nId


        });
    }
    onError()
    {
        console.log("Error  ed 2");
    }

    onSlotVisibilityChange(inViewPercentage)
    {
        this.log("EVENT",{"type":"viewabilityChange","percentage":inViewPercentage})
    }
}
