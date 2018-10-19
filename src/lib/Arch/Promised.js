import SMCPromise from './SMCPromise';
import Evented from "./Evented"

export default class Promised extends Evented
{
    constructor()
    {
        super()
        this._resolvePromises={};
        this._beforePromises={};
        this._finishedPromises={};
        this._promises={};
        this._afterCallbacks=[];
        this._currentState=null;
        this._postPromise={};
    }
    before(state)
    {
        this.addPromisedState(state);
        return {wait:(promise)=>this.addPromiseToState(state,promise)};
    }
    waitFinished(state)
    {
        if(this._finishedPromises[state]===undefined)
            this._finishedPromises[state]=SMCPromise();
        return this._finishedPromises[state];
    }
    addPromisedState(state)
    {
        if(this._beforePromises[state]===undefined) {
            this._beforePromises[state] = [];
            this._postPromise[state]=SMCPromise();
            this._promises[state]=SMCPromise();
        }
    }
    addPromiseToState(state,promise)
    {
        this.addPromisedState(state);
        this._beforePromises[state].push(promise);
    }
    /*
     if(this._beforePromises[state]===undefined) {
            this._beforePromises[state] = [];
            this._postPromise[state]=SMCPromise();
            this._promises[state]=SMCPromise();
        }
     */
    setState(state)
    {
        let execOwnCallback=()=>{
            let outCb="on"+this._currentState+"Finished";
            if(this[outCb])
                this[outCb].apply(this);
            if(this._finishedPromises[this._currentState]!==undefined)
                this._finishedPromises[this._currentState].resolve();

            if(this["on"+state])
                this["on"+state].apply(this);
        }
        let execCallbacks=function(){
            if(this._afterCallbacks[state]===undefined)
                return;
            this._afterCallbacks[state].map((f)=>f.apply(null));
        }.bind(this);

        if(this._beforePromises[state] === undefined) {
            return {
                then: (c) => {
                    execOwnCallback();
                    this._currentState=state;
                    execCallbacks();
                    c.apply(null);
                    if(this._finishedPromises[state]===undefined)
                        this._finishedPromises[state]=SMCPromise();
                    this._finishedPromises[state].resolve();

                }
            };
        }
        let localPromise=SMCPromise();

        this._promises[state].all(this._beforePromises[state]).then(()=>{

            execOwnCallback();
            this._currentState=state;
            execCallbacks();
            this._postPromise[state].resolve();
            localPromise.resolve();

        })
        return localPromise;
    }
    run(stateArray)
    {
        let p=SMCPromise();
        this._runStates(stateArray,0,p);

        return p;
    }
    _runStates(stateArray,index,endPromise)
    {
        if(index==stateArray.length)
            return endPromise.resolve();

        this.setState(stateArray[index]).then(()=>{
            index++;
            this._runStates(stateArray,index,endPromise);
        })
    }
    // Metodo semantico.Permite construcciones del tipo:
    // testI.before("A").wait(test2I.isInState("B"))
    isInState(state)
    {
        if(this._finishedPromises[state]!==undefined)
            return this._finishedPromises[state];
        this.addPromisedState(state)
        return this._postPromise[state];
    }
    prependPromises(states)
    {
        for(let k in states)
        {
            if(this._resolvePromises[k]===undefined)
                this._resolvePromises[k]=SMCPromise(k);
            this.before(states[k]).wait(this._resolvePromises[k]);
        }
    }
    resolve(state)
    {
        if(this._resolvePromises[state]===undefined)
            this._resolvePromises[state]=SMCPromise();

        this._resolvePromises[state].resolve();
    }
}

