export function onLoad(callback,w=top)
{
    if(w.document.readyState=="complete")
        return callback.apply();
    w.addEventListener("load", callback, false);
}
export function onReady(callback,w=top)
{
    if(w.document.readyState=="complete" || w.document.readyState=="interactive")
        return callback.apply();
    w.addEventListener("DOMContentLoaded", callback, false);
}
export function onUnload(callback,w=top)
{
    w.addEventListener("unload",callback, false);
}
export function isPageHidden(w=top)
{
    let d=w.document;
    if (d.hidden!=undefined) { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
    } else if (d.msHidden!=undefined) {
        hidden = "msHidden";
    } else if (d.webkitHidden!=undefined) {
        hidden = "webkitHidden";
    } else { return false; }
    return d[hidden];
}
export function onVisibilityChange(callback,w=top)
{
    let d=w.document;
    let visibilityChange=null;
    if (d.hidden!=undefined) { // Opera 12.10 and Firefox 18 and later support
        visibilityChange = "visibilitychange";
    } else if (d.msHidden!=undefined) {
        visibilityChange = "msvisibilitychange";
    } else if (d.webkitHidden!=undefined) {
        visibilityChange = "webkitvisibilitychange";
    } else { return false; }
    d.addEventListener(visibilityChange, callback, false);
}
export function onPageHide(callback,w=top) {
    if ('onpagehide' in window)
        w.addEventListener('pagehide', callback);
}
export function onPageShow(callback,window=top) {
    if('onpageshow' in top )
        w.addEventListener('pageshow',callback);
}
export function onResize(callback,w=top)
{
    w.addEventListener('resize', callback, false);
}
export function onScroll(callback,w=top) {
    w.addEventListener('scroll', callback, true);
}
export function getViewportHeight(w=top) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
};

export function getViewportWidth(w=top) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
};

export function getYScroll(w=top){
    return (w.document.documentElement.scrollTop ?
        w.document.documentElement.scrollTop :
        w.document.body.scrollTop);
}

function __inViewport(el,offset=0,full=true)
{
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;


    // Only completely visible elements return true:
    if(full)
        return  (elemTop >= -offset) && (elemBottom <= getViewportHeight()+offset);

    return elemTop < window.innerHeight+offset && elemBottom+offset >= 0;

}

export function isInViewport (element, offset=0) {
    return __inViewport(element,offset,true);
};
export function isPartiallyInViewport(element,offset=0)
{
    return __inViewport(element,offset,false);
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
        rect.offsetWidth=oWidth;
        rect.offsetHeight=oHeight;
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