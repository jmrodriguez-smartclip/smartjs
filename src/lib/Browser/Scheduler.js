import * as Compat from './CrossCompat.js';
import Promise from './Promise.js';
let listeners = {};
let listenerCallbacks={};
scrollListeners = [];

class ScrollScheduler {
    constructor(sc) {
        this.scheduler = sc;
        sc.schedule({when: 'LOAD'}, () => this.refreshYPosition());
        this.elements = [];
        this.runningTimer = null;
        let f = function () {
            if (m.runningTimer)
                clearTimeout(m.runningTimer);
                m.runningTimer = setTimeout(function () {
                m.runningTimer = null;
                m.refreshYPosition();
                m.checkElements();
            }, 50);
        };
        Compat.onResize(f);
        Compat.onScroll(f);
    }
    schedule(config)
    {
        config.offset = config.offset || 0;
        let p = new Promise((resolve,reject)=> {
            if (CrossCompat.isInViewport(config.node,config.offset)) {
                resolve(config);
                return p;
            }
            config.promise = p;
            config.resolve=resolve;
            this.elements.push(config);
        });
        return p;
    }
    checkElements () {
        if (this.elements.length == 0)
            return;
        unresolved = [];
        this.elements = this.elements.filter((e) => {
            if (CrossCompat.isInViewport(e.node, e.offset)) {
                e.resolve();
                return false;
            }
            return true;
        });
    }
}


export class Scheduler
{
    construct(){
        this.listeners={};
        Compat.onLoad(()=>this.resolve("LOAD"));
        Compat.onReady(()=>this.resolve("READY"));
        Compat.onUnload(()=>this.resolve("UNLOAD"));
        Compat.onVisibilityChange(()=>this.resolve(Compat.isPageHidden()?"PAGEHIDE":"PAGESHOW"));
        Compat.onPageHide(()=>this.resolve(Compat.isPageHidden()?"PAGEHIDE":"PAGESHOW"));
    }
    resolve(event)
    {
        log("RESOLVING "+event);
        if (this.listeners[event] == undefined)
            return;
        this.listeners[event].resolve();
        this.fire(event);
    }
    buildEventPromise(event)
    {
        if (this.listeners[event]!=undefined) {
            let newProm=new Promise((resolve, reject) => {
                this.listeners[event] = {resolve:resolve,reject:reject}
            });
            this.listeners[event].promise=newProm;
        }
        return this.listeners[event].promise;
    }
    schedule(spec,cb)
    {
        if (spec == undefined || spec == null)
            spec = {};

        let localPromise = new Promise(function(resolve,reject){

            // Wrapper 1 sobre el callback: resuelve la promesa local
            let ss = () => {
                resolve();
                if(spec.fire!=undefined)
                    this.fire(spec.fire)
            };

            // Wrapper 2 sobre el callback: resuelve el timeout
            let t = null;
            if (spec.timeout) t = function () {
                setTimeout(ss, spec.timeout)
            };
            else
                t = ss;

            // Promesas : el scheduling solo se va a ejecutar una vez.

            if (spec.when!=undefined) {
                buildEventPromise().then(t);
                return localPromise;
            }

            // Eventos : el scheduling se va a ejecutar tantas veces como ocurra el evento.
        if(spec.every!=undefined)
        {
            if(this.listenerCallbacks[spec.every]==undefined)
                this.listenerCallbacks[spec.every]=[];
            this.listenerCallbacks[spec.every].push(cb);

            return localPromise;
        }
        // Para el scroll scheduler
        if (spec.offset){
            return this.scrollScheduler.schedule(spec).then(t);
        }
        // En cualquier otro caso, se ejecuta directamente la resolucion de la promesa.
        t();
        });
        return localPromise;
    }
    // Se aniade un listener, en caso de que cb==undefined. Si no, se aniade un listenerCallback, lo cual tiene sentido si el evento que se espera es un "every".
    addListener(ev,cb)
    {
        let prom=buildEventPromise();
        if(cb != undefined)
        {
            this.listenerCallbacks[ev].push(cb);
            this.listeners[ev].then(cb);
        }
        return prom;
    }
    fire = function (ev) {
    if(SMC.isset(this.listenerCallbacks[ev]))
        this.listenerCallbacks[ev].map(function(f){f.apply()});
    };
}