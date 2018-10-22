import * as Compat from "../../../Browser/CrossCompat";
export function createGhost(source,config)
{

    var srcDiv=source.getNode();
    var s={};
    s.oldPosition=srcDiv.style.position;
    s.oldTop=srcDiv.style.top;
    s.oldDisplay=srcDiv.style.display;
    // Se crea un ghost con el mismo tamanio.
    var ghost=top.document.createElement("div");
    srcDiv.parentNode.insertBefore(ghost,destDiv);
    let percent=(config.heightPercent===undefined?100:config.heightPercent)/100;
    ghost.style.width=destDiv.offsetWidth+"px";
    ghost.style.height=parseInt(destDiv.offsetHeight*percent)+"px";
    ghost.style.backgroundColor="transparent";
    ghost.className="SMCGhost";
    source.ghost=ghost;
    return ghost;
}

export function removeGhost(source)
{
    if(source.ghost!==undefined)
        source.parentNode.removeChild(source.ghost);
}
const positionalProperties=["position","top","left","width","height","display","float"];
export function restoreNode(source)
{
        if(source.SMCPositionData!==undefined) {
            for(var k in source.SMCPositionData)
                source.style[k]=source.SMCPositionData[k];
        }
}

let scrollListener=null;
let fixedNodes=[];

export function moveOver(dest,source,options)
{
    source.SMCPositionData={};
    positionalProperties.map((i)=>{source.SMCPositionData[i]=source.style[i]});
    if(options!==undefined && options.opacity==undefined)
        dest.style.opacity=options.opacity;

    source.overlayed = dest;
    sourceDiv.parentNode.insertBefore(ghostS,sourceDiv);
        sourceDiv.style.display="fixed";
        sourceDiv.style.top=dest.ghost.style.top;
        sourceDiv.style.left=dest.ghost.style.left;
        source.ghost=ghostS;
        source.timestamp = (new Date()).getTime();
        return source;
    }
    scrollListener()
    {

        for(var k in this.overlaying) {
            var pos = this.slots[k].overlayed.ghost.getBoundingClientRect();
            if (pos) {
                var overlay=top.document.getElementById(this.slots[k].slot.getId());
                var oldDisp=overlay.style.display;
                overlay.style.position = 'fixed';
                overlay.style.top = pos.top+"px";
                overlay.style.left=pos.left+"px";

                overlay.style.display=oldDisp;
            }
        }
        //this.check();
    }
}



