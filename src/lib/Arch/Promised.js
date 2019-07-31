import SMCPromise from './SMCPromise';
import Evented from "./Evented"

top.__promisedStore=[];
top.__debugPromised=function()
{
    for(let k=0;k<top.__promisedStore.length;k++)
    {
        let i=top.__promisedStore[k];
        if(i.currentState==null)
            continue;
        let cs=i.currentState;

        console.log("Estado de :"+i.getLabel()+" : "+i.stateArray[cs]);

        let allProms=i._resolvePromises[i.currentState];

        if(allProms!==undefined)
        {
            for(let h in allProms)
            {
                console.log("    "+h+" :: "+allProms[h].getState())
            }
        }
    }
}
export default class Promised extends Evented
{
    constructor(serviceContainer)
    {
        super();
        this.currentState=null;
        this._resolvePromises={};
        this._beforePromises={};
        this._finishedPromises={};
        this._promises={};
        this._afterCallbacks=[];
        this._currentState=null;
        this.nextState=null;

        top.__promisedStore.push(this);
        serviceContainer.getLoadedPromise().then(()=>{

            this.setLogger(serviceContainer.get("Log"))
        })
    }
    before(state)
    {
        this.addPromisedState(state);
        return {wait:(promise)=>this.addPromiseToState(state,promise)};
    }
    waitFinished(state)
    {
        if(this._finishedPromises[state]===undefined)
            this._finishedPromises[state]=SMCPromise(this.getLabel()+"::WaitFinished:"+state);
        return this._finishedPromises[state];
    }
    addPromisedState(state)
    {
        if(this._beforePromises[state]===undefined) {
            this._beforePromises[state] = [];
            this._finishedPromises[state]=SMCPromise(this.getLabel()+":_finishedPromise:"+state);
            this._promises[state]=SMCPromise(this.getLabel()+":_promises:"+state);
        }
    }
    addPromiseToState(state,promise)
    {
        this.addPromisedState(state);
        this._beforePromises[state].push(promise);
    }

    setState(state)
    {
        try {
            // Si existe un metodo llamado before_<state>, se le llama primero, y se aniade la promesa a los
            // estados "before"
            if (this["before_" + state] !== undefined)
                this.addPromiseToState(state, this["before_" + state].apply(this, null));

            let execOwnCallback = () => {
                let outCb = "on" + this._currentState + "Finished";
                if (this[outCb])
                    this[outCb].apply(this);
                if (this._finishedPromises[this._currentState] !== undefined)
                    this._finishedPromises[this._currentState].resolve();

                if (this["on" + state])
                    this["on" + state].apply(this);
            }
            let execCallbacks = function () {
                if (this._afterCallbacks[state] === undefined)
                    return;
                this._afterCallbacks[state].map((f) => f.apply(null));
            }.bind(this);


            let localPromise = SMCPromise(this.getLabel() + ":LocalPromise:" + state);
            // Por si el estado actual aun no existe en this._promises
            this.addPromisedState(state);
            this._promises[state].all(this._beforePromises[state]).then(() => {

                try {
                    execOwnCallback();
                } catch (e) {
                    this.logger.exception(this.getLabel(), "execOwnCallback :" + state, e);
                }
                this._currentState = state;
                try {
                    execCallbacks();
                } catch (e) {
                    this.logger.exception(this.getLabel(), "execCallback :" + state, e);
                }
                if (this._finishedPromises[state] === undefined)
                    this._finishedPromises[state] = SMCPromise(this.getLabel() + ":_finishedPromises:" + state);
                try {
                    this._finishedPromises[state].resolve();
                } catch (e) {
                    this.logger.exception(this.getLabel(), "FinishedPromise :" + state, e);
                }
                localPromise.resolve();

            });
            return localPromise;
        }catch(e)
        {
            this.logger.exception(this.getLabel(), "setState :" + state, e);
        }
    }
    run(stateArray)
    {
        let p=SMCPromise(this.getLabel()+":run");
        this.stateArray=stateArray;
        this.currentState=0;
        this._runStates(stateArray,p);

        return p;
    }
    _runStates(stateArray,endPromise)
    {
        if(this.currentState===stateArray.length) {
            this.debug("END");
            return endPromise.resolve();
        }

        this.setState(stateArray[this.currentState]).then(()=>{

            if(this.currentState<stateArray.length)
                this.debug("STATE SET:"+stateArray[this.currentState]);

            if(this.nextState!==null)
            {
                this.currentState=this.nextState;
                this.nextState=null;
            }
            else
                this.currentState++;

            this._runStates(stateArray,endPromise);
        })
    }
    // Metodo semantico.Permite construcciones del tipo:
    // testI.before("A").wait(test2I.isInState("B"))
    isInState(state)
    {
        if(this._finishedPromises[state]!==undefined)
            return this._finishedPromises[state];
        this.addPromisedState(state)
        return this._finishedPromises[state];
    }
    gotoState(state)
    {
        this.nexState=this.stateArray.indexOf(state);
        if(this.nextState<0)
            this.nextState=null;
    }
    prependPromises(states)
    {
        for(let k in states)
        {
            if(this._resolvePromises[k]===undefined)
                this._resolvePromises[k]=SMCPromise(this.getLabel()+":_resolvePromises:"+k);
            this.before(states[k]).wait(this._resolvePromises[k]);
        }
    }
    resolve(state)
    {
        if(this._resolvePromises[state]===undefined)
            this._resolvePromises[state]=SMCPromise(this.getLabel()+":_resolvePromises:"+state);

        this._resolvePromises[state].resolve();
    }
    discard(promises)
    {
        promises.map((i)=>{
            this._resolvePromises[i].resolve();
        });
    }
    getLabel()
    {
        return "<Unnamed Promised>";
    }
    debug(str)
    {
        console.log(this.getLabel()+"::"+str);
    }
}

