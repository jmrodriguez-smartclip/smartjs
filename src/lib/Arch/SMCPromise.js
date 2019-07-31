import * as SMC from '../Common.js'

function g(h) {
    return SMC.isFunction(h)
}

function defer(h) {
    //"undefined" != typeof setImmediate ? setImmediate(h) : "undefined" != typeof process && process.nextTick ? process.nextTick(h) : setTimeout(h, 0)
    h();
}

top.__Promises = {};
top.dumpPromises=function()
{
    for(var k in top.__Promises)
    {
        switch(top.__Promises[k].getState())
        {
            case null:{console.log(k+"::PENDING")}break;
            case true:{console.log(k+"::filled");}break;
            default:{
                console.log(k+"::rejected")
            }
        }
    }
}

export default function SMCPromise(label) {
    let state=null;           // undefined/null = pending, true = fulfilled, false = rejected
    let values = [];     // an array of values as arguments for the then() handlers
    let deferred = [];   // functions to call when set() is invoked


    let set = function (newState, newValues) {
        return set.__resolve(newState, newValues);
    };
    if (label !== undefined)
        top.__Promises[label] = set;

    set.getState=function(){
        return state;
    }
    set.getLabel=function(){
        return label;
    }
    set["resolve"] = function (val) {
        return set["__resolve"](true, val);
    }
    set["__resolve"] = function (newState, newValues) {
        //if(label!==undefined)
        //    console.log(label+" RESOLVE ");
        if (state == null && newState != null) {
            state = newState;
            values = newValues;
            if (deferred.length)
                defer(function () {
                    for (let i = 0; i < deferred.length; i++) {
          //              if(label!==undefined)
          //                  console.log(" RESOLVING "+i);
                        deferred[i]();
                    }
                });
        }
        return state;
    };
    set["reject"] = function () {
        set.__resolve(false);
    };

    set["timeout"] = function (timeoutMs, value) {
        setTimeout(function () {
            set.resolve(value);
        }, timeoutMs);
        return set;
    };
    set["all"] = function (promiseArray) {
        if (!SMC.isset(promiseArray) || promiseArray.length == 0) {
            set.resolve([]);
        } else {
            let n = promiseArray.length;
            let result = new Array(n);
            promiseArray.map(function (p, i) {

                p.then(function (res) {


                    result[i] = res;
                    n--;
            //        if(label!==undefined)
            //            console.log(label+" EJECUTANDO ALL "+n);
                    if (n == 0) {
                        set.resolve([result])
                    }

                }, function () {
                    set.reject();
                })
            })
        }
        return set;
    };

    set['then'] = function (onFulfilled, onRejected) {
        //if(label!==undefined)
        //    console.log(label+" EJECUTANDO THEN");
        let promise2 = SMCPromise(label);
        let callCallbacks = function () {
            try {
                let f = (state ? onFulfilled : onRejected);
                if (SMC.isFunction(f)) {
                    let resolve = function (x) {
                        let then, cbCalled = 0;
                        try {
                            if (x && (SMC.isObject(x) || SMC.isFunction(x)) && SMC.isFunction(then = x['then'])) {
                                if (x === promise2)
                                    throw new TypeError();
                                then['call'](x,
                                    function () {
                                        if (!cbCalled++) resolve.apply(undef, arguments);
                                    },
                                    function (value) {
                                        if (!cbCalled++) promise2(false, [value]);
                                    });
                            } else
                                promise2(true, arguments);
                        } catch (e) {
                            if (!cbCalled++)
                                promise2(false, [e]);
                        }
                    }
                    resolve(f.apply(null, [values] || []));
                } else
                    promise2(state, values);
            } catch (e) {
                console.error("Excepcion en promesa:")
                console.dir(e);
                promise2(false, [e]);
            }
        };
        if (state != null)
            defer(callCallbacks);
        else
            deferred.push(callCallbacks);
        return promise2;
    };
    set.label = label;
    set.getState = function () {
        return state;
    }
    return set;
};
