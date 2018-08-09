export function isFunction(f) {
    return typeof f == 'function';
}
export function isObject(f) {
    return typeof f == 'object';
}

export  function isArray  (l) {
    return l.constructor.toString().indexOf("Array");
};
export  function isset  (l) {
    return typeof l != "undefined";
};
export function issetOr (l, o) {
    return isset(l) ? l : o;
};
export function Merge (source,overlay) {
    for (var k in overlay) {
        if(!isset(source[k]))
        {
            source[k]=overlay[k];
            continue;
        }
        if(source[k]==null)
            continue;
        if(overlay[k]==null)
            continue;

        if(overlay[k].constructor.toString().indexOf("Object")>-1)
            SMC.Merge(source[k],overlay[k]);
        else
            source[k]=overlay[k];
    }
    return source
}
export function asyncLoad (url, notAsync) {
    var p = SMCPromise();
    var pbjsEl = document.createElement("script");
    pbjsEl.type = "text/javascript";
    if (!isset(notAsync) || notAsync == false) pbjsEl.async = true;
    pbjsEl.src = url;
    if (document.body) document.body.appendChild(pbjsEl);
    else {
        var pbjsTargetEl = document.getElementsByTagName("head")[0];
        pbjsTargetEl.insertBefore(pbjsEl, pbjsTargetEl.firstChild);
    }
    pbjsEl.onload = pbjsEl.onreadystatechange =  ()=> {
        pbjsEl.onload = pbjsEl.onreadystatechange = null;
        p(true);
    };
    return p;
};