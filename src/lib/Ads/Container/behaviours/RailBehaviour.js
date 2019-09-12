import SMCPromise from "../../../Arch/SMCPromise";
import ContainerBehaviour from "./ContainerBehaviour"
import * as CrossCompat from "../../../Browser/CrossCompat"

export default class RailBehaviour extends ContainerBehaviour
{
    initialize()
    {

        super.initialize()
    }

    onConfigured()
    {
        let domNode=this.container.getNode().getNode();
        this.savedNode=domNode;
        let wrapperNode=document.createElement("div");
        this.wrapperNode=wrapperNode;
        wrapperNode.className=domNode.className;
        domNode.parentNode.appendChild(wrapperNode);
        domNode.id="TheId";
        Object.assign(domNode.style,{position:"absolute",bottom:"0px","left":"0px"})
        wrapperNode.appendChild(domNode);
        Object.assign(wrapperNode.style,{height:"200px",position:"relative",backgroundColor:"yellow"} )

        CrossCompat.onVisibilityChange(domNode,(perc,ev)=>{

            let e=ev[0]
            let neededMargin=e.boundingClientRect.y;
            if(neededMargin < 0)
            {
                let nMargin=-1*neededMargin;
                let curHeight=parseInt(wrapperNode.style.height);
                let maxY=Math.min(2000,curHeight+nMargin);

                wrapperNode.style.height=maxY+"px"
            }
            else
            {
                let dif=domNode.offsetHeight - e.intersectionRect.height;
                if(dif > 0)
                {
                    if(wrapperNode.offsetHeight > domNode.offsetHeight)
                        wrapperNode.style.height=(parseInt(wrapperNode.style.height)-dif)+"px"
                }

            }
        })
    }

    onDestroy()
    {
        this.container.removeBehaviour(this);
    }
    getLabel()
    {
        return "RailsBehaviour";
    }
}
