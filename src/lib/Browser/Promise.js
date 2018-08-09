import * as SMC from 'Common/Common.js'
    function g(h) {
        return "function" == typeof h
    }

    function defer(h) {
        //"undefined" != typeof setImmediate ? setImmediate(h) : "undefined" != typeof process && process.nextTick ? process.nextTick(h) : setTimeout(h, 0)
        h();
    }

    export function Promise(extend) {
    let state;           // undefined/null = pending, true = fulfilled, false = rejected
    let values = [];     // an array of values as arguments for the then() handlers
    let deferred = [];   // functions to call when set() is invoked

    let set = function(newState, newValues) {
        return set.__resolve(newState,newValues);
    };
    set["resolve"]=function(val)
    {

        return set["__resolve"](true,val);
    }
    set["__resolve"]=function(newState,newValues)
    {

        if (state == null && newState != null) {
            state = newState;
            values = newValues;
            if (deferred.length)
                defer(function() {
                    for (let i = 0; i < deferred.length; i++)
                        deferred[i]();
                });
        }
        return state;
    };
    set["reject"]=function(){
        set.__resolve(false);
    };

    set["timeout"] = function (timeoutMs,value) {
            setTimeout(function () {
                set.resolve(value);
            }, timeoutMs);
            return set;
        };
    set["all"] = function (promiseArray) {
            if(!SMC.isset(promiseArray) || promiseArray.length==0)
            {
                set.resolve([]);
            }
            else {
                let n = promiseArray.length;
                let result = new Array(n);
                promiseArray.map(function (p, i) {

                    p.then(function (res) {

                        result[i] = res;
                        n--;
                        if (n == 0) {
                            set.resolve([result])
                        };
                    }, function () {
                        set.reject();
                    })
                })
            }
            return set;
        };

    set['then'] = function (onFulfilled, onRejected) {

        let promise2 = Promise(extend);
        let callCallbacks = function() {
            try {
                let f = (state ? onFulfilled : onRejected);
                if (SMC.isFunction(f)) {
                    function resolve(x) {
                        let then, cbCalled = 0;
                        try {
                            if (x && (SMC.isObject(x) || SMC.isFunction(x)) && SMC.isFunction(then = x['then'])) {
                                if (x === promise2)
                                    throw new TypeError();
                                then['call'](x,
                                    function() { if (!cbCalled++) resolve.apply(undef,arguments); } ,
                                    function(value){ if (!cbCalled++) promise2(false,[value]);});
                            }
                            else
                                 promise2(true, arguments);
                        }
                        catch(e) {
                            if (!cbCalled++)
                                promise2(false, [e]);
                        }
                    }
                    resolve(f.apply(null, [values] || []));
                }
                else
                    promise2(state, values);
            }
            catch (e) {
                promise2(false, [e]);
            }
        };
        if (state != null)
            defer(callCallbacks);
        else
            deferred.push(callCallbacks);
        return promise2;
    };
    if(extend){
        set = extend(set);
    }
    return set;
};