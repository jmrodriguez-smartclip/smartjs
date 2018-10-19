import BaseContainer from "BaseContainer"
class AvaContainer extends BaseContainer
{

    setAd(ad)
    {
        super.setAd(ad);
    }
    addSkipButton()
    {

    }
    addClasses()
    {
        let head=top.document.querySelector('head')
        let style= "<style type='text/css'>"+
                    ".fixed_intext_sc_v1{ position: fixed !important; width: " + Ava_conf.playerWidth + "px!important;height: " + Ava_conf.playerHeight + "px !important; "+ horizontal + ": " + Ava_conf.player_margin_right + "px ;"+ vertical + ": " + Ava_conf.player_margin_bottom + "px;opacity: 0;z-index: 128362132;}"+
                   ".intxt_adjust{ width: 100% !important;height: 100% !important;}"+
                   ".fixed_intext_sc_mob_v1 {position: fixed!important; " + vertical +": 0px; width: 100%!important; min-height: 180px; left: 0px; z-index: 64654651464; margin-bottom: " + Ava_conf.player_margin_bottom + "px!important;opacity: 0;}"+
                    "</style";
        head.insertAdjacentHTML("beforeend",style);
    }
}