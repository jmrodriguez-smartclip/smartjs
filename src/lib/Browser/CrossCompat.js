import * as Geometry from './Geometry.js';

let defaultWindow=top;
export function setDefaultWindow(w)
{
    defaultWindow=w;
}
export function onLoad(callback,w=defaultWindow)
{
    if(w.document.readyState==="complete")
        return callback.apply();
    w.addEventListener("load", callback, false);
}
export function onReady(callback,w=defaultWindow)
{
    if(w.document.readyState==="complete" || w.document.readyState==="interactive")
        return callback.apply();
    w.addEventListener("DOMContentLoaded", callback, false);
}
export function onUnload(callback,w=defaultWindow)
{
    w.addEventListener("unload",callback, false);
}
export function isPageHidden(w=defaultWindow)
{
    let d=w.document;
    let hidden="";
    if (d.hidden!==undefined) { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
    } else if (d.msHidden!==undefined) {
        hidden = "msHidden";
    } else if (d.webkitHidden!==undefined) {
        hidden = "webkitHidden";
    } else { return false; }
    return d[hidden];
}
export function onBrowserVisibilityChange(callback,w=defaultWindow)
{
    let d=w.document;
    let visibilityChange=null;
    if (d.hidden!==undefined) { // Opera 12.10 and Firefox 18 and later support
        visibilityChange = "visibilitychange";
    } else if (d.msHidden!==undefined) {
        visibilityChange = "msvisibilitychange";
    } else if (d.webkitHidden!==undefined) {
        visibilityChange = "webkitvisibilitychange";
    } else { return false; }
    d.addEventListener(visibilityChange, callback, false);
}

export function onVisibilityChange(element, callback, offset=0 )
{
    if(typeof window.IntersectionObserver!==null)
    {
        let thresholds=[];
        for(let k=0;k<11;k++)thresholds.push(k/10);
        let observer=new IntersectionObserver(
            (e)=> {
                callback.apply(null,[e[0].intersectionRatio * 100 ]);
            },
            {root:null,rootMargin:offset+"px",threshold:thresholds});
        observer.observe(element);
    }
    else
    {
        (function(){
            let lastPercent=null;
            let f=function(){
                let vis=getVisiblePercentage(element);
                if(vis!==lastPercent && lastPercent!==null)
                    callback(vis);
                lastPercent=vis;
            };
            setInterval(f,100);
        })();
    }
}

export function onPageHide(callback,w=defaultWindow) {
    if ('onpagehide' in window)
        w.addEventListener('pagehide', callback);
}
export function onPageShow(callback,w=defaultWindow) {
    if('onpageshow' in top )
        w.addEventListener('pageshow',callback);
}
export function onResize(callback,w=defaultWindow)
{
    w.addEventListener('resize', callback, false);
}
export function onScroll(callback,w=defaultWindow) {
    w.addEventListener('scroll', callback, true);
}
export function onError(callback,w=defaultWindow)
{
    w.addEventListener('error', callback);
}
export function getViewportHeight(w=defaultWindow) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
};

export function getViewportWidth(w=defaultWindow) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
};
export function getPageWidth(w=defaultWindow)
{
    return w.document.documentElement.offsetWidth;
}
export function getPageHeight(w=defaultWindow)
{
    return w.document.documentElement.offsetHeight;
}
export function getVisibleViewportRect(w=defaultWindow)
{
    let ys=getYScroll(w),xs=getXScroll(w);
    return {
        top:ys,bottom:ys+getViewportHeight(w),left:xs,right:xs+getViewportWidth(w)
    };
}
export function getYScroll(w=defaultWindow){
    return (w.document.documentElement.scrollTop ?
        w.document.documentElement.scrollTop :
        w.document.body.scrollTop);
}
export function getXScroll(w=defaultWindow)
{
    return (w.document.documentElement.scrollLeft ?
        w.document.documentElement.scrollLeft :
        w.document.body.scrollLeft);
}


function __isInViewport(el,offset=0,full=false,w=defaultWindow)
{
    let d = getElementCoordinates(el);
    let v = getVisibleViewportRect(w);
    if(!Geometry.withinRange(v,d,offset))
        return false;
    if(!full)
        return true;
    return Geometry.isSquareContained(d,v);
}

function getPercentage(el,w,target="v")
{
    let d = getElementCoordinates(el);
    let v = getVisibleViewportRect(w);
    let i=Geometry.getIntersection(d,v);
    if(i==null)
        return 0;
    return (Geometry.getArea(i)/Geometry.getArea(target=="v"?v:d)).toFixed(2);
}
export function getVisiblePercentage(el,w=defaultWindow)
{
    return getPercentage(el,w,"d")

}
export function getScreenPercentage(el,w=defaultWindow)
{
    return getPercentage(el,w,"v")
}
export function isInViewport(el,offset,w=defaultWindow)
{
    return __isInViewport(el,offset,true,w);
}
export function isPartiallyInViewport(el,offset,w=defaultWindow)
{
    return __isInViewport(el,offset,false,w);
}


export function getElementCoordinates(element)
{
        var theDiv = element;
        if (theDiv == null) return null;
        var addTop=0;
        var orDisplay=theDiv.style.display;
        var orParent=theDiv.parentElement;
        var oWidth=theDiv.offsetWidth;
        var oHeight=theDiv.offsetHeight;
        if(theDiv.style.display=='none')
        {

            var nt=theDiv.previousSibling;
            theDiv=null;
            try {
                while (nt != null && theDiv==null) {
                    nt = nt.previousSibling;
                    if(SMC.isset(nt.offsetHeight))
                    {
                        theDiv=nt;
                        addTop=nt.offsetHeight;

                    }

                }
                if(theDiv==null)
                    theDiv=theDiv.parentElement;
            }
            catch(e)
            {

            }
        }
        if (theDiv == null) return null;

        var target = theDiv,
            target_width = target.offsetWidth,
            target_height = target.offsetHeight,
            target_left = target.offsetLeft,
            target_top = target.offsetTop,
            gleft = 0,
            gtop = 0,
            rect = {};

        var moonwalk = function (_parent) {
            if (!!_parent) {
                gleft += _parent.offsetLeft;
                gtop += _parent.offsetTop;
                moonwalk(_parent.offsetParent);
            } else {
                return rect = {
                    top: target.offsetTop + gtop,
                    left: target.offsetLeft + gleft,
                    bottom: (target.offsetTop + gtop) + target_height,
                    right: (target.offsetLeft + gleft) + target_width
                };
            }
        };
        moonwalk(target.offsetParent);
        rect.divDisplay=orDisplay;
        rect.parentDisplay='block';
        rect.width=oWidth;
        rect.height=oHeight;
        while(orParent!=null)
        {
            if(orParent.style && orParent.style.display=="none")
            {
                rect.parentDisplay='none';
            }
            orParent=orParent.parentElement;
        }

        return rect;
}

export function getScreenWidth() { return window.screen.width;}
export function getScreenHeight() { return window.screen.height;}

let customStylesheet=null;
function addCSSRule(selector,rule)
{
    if(customStylesheet===null)
    {
        let node=document.createElement("style");
        node.appendChild(document.createTextNode(""));
        document.head.appendChild(node);
        customStylesheet=node.sheet;
    }
    if(customStylesheet.insertRule!==undefined)
        customStylesheet.insertRule(selector+" {"+rule+"}",-1);
    if(customStylesheet.addRule!==undefined)
        customStylesheet.addRule(selector,rule,-1);
}

