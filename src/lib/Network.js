import {isset} from "./Common";
import SMCPromise from "./Arch/SMCPromise";

export function asyncLoad (url, notAsync) {
    var p = SMCPromise("Network::AsyncLoad");
    var pbjsEl = document.createElement("script");
    pbjsEl.type = "text/javascript";

    pbjsEl.async = (!isset(notAsync) || notAsync == false)

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
}
export function loadStyleSheet(url)
{
    var p = SMCPromise("Network::loadStyleSheet");
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';

    if (document.body) document.body.appendChild(link);
    else {
        var pbjsTargetEl = document.getElementsByTagName("head")[0];
        pbjsTargetEl.insertBefore(link, pbjsTargetEl.firstChild);
    }
    link.onload = link.onreadystatechange =  ()=> {
        link.onload = link.onreadystatechange = null;
        p(true);
    };
}

export function loadDependencies(deps)
{
    let p=SMCPromise("Network::loadDependencies");

    if(deps===null || deps===undefined)
        deps={};

    if(deps.css!==undefined)
        deps.css.map((i) => this.loadStyleSheet(i));
    if(deps.scripts!==undefined)
    {
        p.all(deps.scripts.map((i)=>{return this.asyncLoad(i,true)}))
            .then(
                ()=> {
                    p.resolve();
                }
            );

    }
    else
        p.resolve();
    return p;
}
