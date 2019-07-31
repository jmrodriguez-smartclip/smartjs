import BaseContainer from "./BaseContainer"
import PlaceHolder from "./lib/PlaceHolder"
import * as CrossCompat from "../../Browser/CrossCompat"

export default class  AvaContainer extends BaseContainer
{

    onAttached()
    {
        super.onAttached();
        this.divNode.applyStyles({"position":"relative"});
        this.lastChange=null;
        this.floating=false;
        this.oldProperties=null;
        this.placeHolder=null;
        this.lastPercent=null;
        CrossCompat.onVisibilityChange(this.divNode.getNode(),
            (percent)=>{
                this.onVisibilityChange(percent)},
            0);
    }
    onVisibilityChange(percent) {
        if(this.lastPercent===null || !(this.lastPercent < 5 && percent > 5) ||
          !(this.lastPercent > 5 && percent < 5)
        ) {
          /*  var tstamp = new Date().getTime();
            if (this.lastChange !== null && tstamp - this.lastChange < 200)
                return;*/
        }
        //this.lastChange = tstamp;
        this.lastPercent=percent;

        if (percent <= 5 && !this.floating) {
            this.placeHolder = new PlaceHolder(this, {});
            this.placeHolder.create();
            CrossCompat.onVisibilityChange(this.placeHolder.getNode(),
                (percent) => {
                    this.onPlaceHolderVisibilityChange(percent)
                },
                0);
            this.oldProperties = this.divNode.getPositionalProperties();
            this.divNode.applyStyles(
                {
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    transform: "scaleX(.5) scaleY(.5)",
                    padding:"6px",
                    backgroundColor:"green",
                    border:"4px solid yellow"
                }
            )
            this.floating = true;
        }
    }
    onPlaceHolderVisibilityChange(percent)
    {
        if(percent > 5) {
            if (this.floating === true) {
                this.placeHolder.remove();
                this.divNode.applyStyles(this.oldProperties);
                this.divNode.applyStyles({transform:""});

                this.floating = false;
            }
        }
    }

    getLabel()
    {
        return "AvaContainer";
    }
}


