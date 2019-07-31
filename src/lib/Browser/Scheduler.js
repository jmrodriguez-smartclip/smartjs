import * as Compat from './CrossCompat.js';
import SMCPromise from '../Arch/SMCPromise.js';
import Service from '../Service/Service';
let listeners = {};
let listenerCallbacks={};
let scrollListeners = [];
let unresolved=[];

class ScrollScheduler {
    constructor(sc) {
        this.scheduler = sc;
        sc.schedule({when: 'LOAD'}, () => this.refreshYPosition());
        this.elements = [];
        this.runningTimer = null;
        let m=this;

        let f = function () {
            /* Este timer sirve para evitar multiples llamadas durante un scroll o resize.
               Tiene que mantenerse al menos 50 milisegundos sin eventos, antes de comprobar posiciones.
             */
            if (m.runningTimer)
                clearTimeout(m.runningTimer);
                m.runningTimer = setTimeout(function () {
                m.runningTimer = null;
                m.checkElements();
            }, 50);
        };
        Compat.onResize(f);
        Compat.onScroll(f);
    }
    schedule(config)
    {
        config.offset = config.offset || 0;
        let p = SMCPromise();
        if (CrossCompat.isInViewport(config.node,config.offset)) {
                p.resolve(config);
                return p;
        }
        config.promise = p;
        this.elements.push(config);
        return p;
    }
    checkElements () {
        if (this.elements.length === 0)
            return;
        unresolved = [];
        this.elements = this.elements.filter((e) => {
            if (CrossCompat.isInViewport(e.node, e.offset)) {
                e.promise.resolve();
                return false;
            }
            return true;
        });
    }
}


export default class Scheduler extends Service
{
    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);
        this.listeners={};
        this.listenerCallbacks={};
        Compat.onLoad(()=>this.resolve("LOAD"));
        Compat.onReady(()=>this.resolve("READY"));
        Compat.onUnload(()=>this.resolve("UNLOAD"));
        Compat.onBrowserVisibilityChange(()=>{console.log("CHANGED VISIBILITY");this.resolve(Compat.isPageHidden()?"PAGEHIDE":"PAGESHOW")});
        Compat.onPageHide(()=>this.resolve(Compat.isPageHidden()?"PAGEHIDE":"PAGESHOW"));

    }
    resolve(event)
    {
        if (this.listeners[event] == undefined )
            this.listeners[event]=SMCPromise();

        this.listeners[event].resolve();

        if(this.listenerCallbacks[event]!= undefined)
        {
            this.listenerCallbacks[event].map(function(c){c.apply(null)});
        }
        this.fire(event);
    }
    buildEventPromise(event)
    {
        if (this.listeners[event]===undefined) {

            this.listeners[event]=SMCPromise();
        }
        return this.listeners[event];
    }
    schedule(spec,cb)
    {
        if (spec == undefined || spec == null)
            spec = {};

        var m=this;
        let localPromise = SMCPromise();


            // Wrapper 1 sobre el callback: resuelve la promesa local
            let ss = () => {
                localPromise.resolve();
                if(spec.fire!=undefined)
                    m.fire(spec.fire)
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
                if (this.listeners[spec.when]===undefined)
                    this.listeners[spec.when] = SMCPromise();
                this.listeners[spec.when].then(t);
                return localPromise;
            }

            // Eventos : el scheduling se va a ejecutar tantas veces como ocurra el evento.
        if(spec.every!=undefined)
        {
            if(m.listenerCallbacks[spec.every]==undefined)
                m.listenerCallbacks[spec.every]=[];
            m.listenerCallbacks[spec.every].push(cb);
            return;
        }
        // Para el scroll scheduler
            if (spec.offset){
                m.scrollScheduler.schedule(spec).then(t);
            }
        // En cualquier otro caso, se ejecuta directamente la resolucion de la promesa.
         t.apply(null);

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
    fire(ev) {
    if(this.listenerCallbacks[ev]!=undefined)
        this.listenerCallbacks[ev].map(function(f){f.apply()});
    };
    getLabel()
    {
        return "Scheduler";
    }
}
