import {isset} from "./Common";
import SMCPromise from "./Arch/SMCPromise";

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