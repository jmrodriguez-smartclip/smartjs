import ConsoleLogger from "../Log/ConsoleLogger"

export default class Evented {

    constructor() {
        this.logger=new ConsoleLogger({})
        this.listeners = {};
    }
    setLogger(logger)
    {
        this.logger=logger;
    }

    destruct() {
        try {
            if (this.runningListeners) {
                this.runningListeners.map(function (i) {
                    i.target.removeListeners(this);
                })
            }
            // If this destructor was called while this object was notifying its listeners,
            // simply set a flag and return.
            if (this.notifying) {
                this.mustDestruct = true;
                return;
            }
            this.runningListeners = null;
            this.listeners = null;
        } catch (e) {
            this.logger.exception(this.getLabel(), "destruct", e);
        }

    }

    addListener(evType, object, method, param, target) {
        try {
            if (!this.listeners[evType])
                this.listeners[evType] = [];

            var k;
            for (k = 0; k < this.listeners[evType].length; k++) {
                if (this.listeners[evType][k].obj == object && this.listeners[evType][k].method == method) {
                    return;
                }
            }
            this.listeners[evType].push({
                obj: object,
                method: method,
                param: param,
                target: target
            });
        } catch (e) {
            this.logger.exception(this.getLabel(), "addListener", e);
        }
    }

    removeListener(evType, object, method, target) {
        try {
            if (!this.listeners) return;
            if (!this.listeners[evType]) return;
            var k, curL;
            for (k = 0; k < this.listeners[evType].length; k++) {
                curL = this.listeners[evType][k];
                if (curL.obj == object && (!method || (method == curL.method))) {
                    if (target) {
                        if (curL.target != target)
                            continue;
                    }
                    this.listeners[evType].splice(k, 1);
                    if (object && object.removeRunningListener) {
                        object.removeRunningListener(this);
                    }
                    return;
                }
            }
        } catch (e) {
            this.logger.exception(this.getLabel(), "removeListener", e);
        }
    }

    removeListeners(object) {
        try {
            if (!this.listeners) return;
            var k, j;
            for (k in this.listeners) {
                for (j = 0; j < this.listeners[k].length; j++) {
                    if (this.listeners[k][j].obj == object) {
                        this.listeners[k].splice(j, 1);
                        j--;
                    }
                }
            }
        } catch (e) {
            this.logger.exception(this.getLabel(), "removeListener", e);
        }
    }

    notify(evType, data, target) {
        try {
            if (!this.listeners) return;
            if (!this.listeners[evType]) {
                return;
            }
            this.notifying = true;
            var k;
            var obj;
            for (k = 0; k < this.listeners[evType].length; k++) {
                obj = this.listeners[evType][k];
                try {
                    if (obj.obj) {
                        if (typeof obj.obj == "function") {

                            obj.obj(evType, data, obj.param, target);

                        } else {
                            if (!obj.obj[obj.method])
                                continue;

                            obj.obj[obj.method](evType, data, obj.param, target);
                        }
                    } else {

                        obj.method(evType, data, obj.param, target);

                    }
                } catch (e) {
                    this.logger.exception(this.getLabel(), "notify :" + evType, e);
                }
            }
            // The following is a protection code; if marks this object as "notifying",so, if as part of the notification, this object
            // is destroyed, it will not destroy the listeners, but set the mustDestroy flag to true.
            this.notifying = false;
            if (this.mustDestroy) {
                this.listeners = null;
            }
        } catch (e) {
            this.logger.error(this.getLabel(), "notify", e);
        }
    }

    fireEvent(event, data, target) {
        if (data !== null) {
            if (typeof data != "undefined")
                data.target = target;
            else
                data = {
                    target: target
                };
            data.src = this;
        }
        this.notify(event, data, target);
    }

    getLabel() {
        return "Anonymous Evented";
    }
}
