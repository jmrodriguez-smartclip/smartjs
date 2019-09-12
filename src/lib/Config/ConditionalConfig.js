/**
 * DEPRECATED.
 */
import * as Parser from "../Parser/Conditionals"
export default class ConditionalConfig
{
    constructor(config,properties)
    {
        this.config=config;
        this.properties=properties;
        //Parser.parse
    }
    parse()
    {
        return this.traverse(this.config);
    }

    checkCond(obj)
    {
        if(obj===null || obj===undefined)
            return obj;

        switch(typeof obj.cond)
        {
            case "undefined":{return obj;}
            case "string":{return Parser.parse(obj.cond,{properties:this.properties})}
            default:
            {
                if(typeof obj.cond.expr=="undefined")
                    return obj;
                let b=Parser.parse(obj.cond.expr,{properties:this.properties});
                if(b && obj.cond.onTrue!=undefined)
                    return obj.cond.onTrue;
                if(!b && obj.cond.onFalse!=undefined)
                    return obj.cond.onFalse;
                return null;
            }
        }
    }

    traverse (x) {
        if (Object.prototype.toString.call(x) === '[object Array]')
        {
            return this.traverseArray(x)
        } else if ((typeof x === 'object') && (x !== null)) {
            return this.traverseObject(x)
        } else {
            return x;
        }
    }
    traverseArray (arr) {
        let result=[];
        arr.forEach((x)=> {
            let newVal=this.checkCond(x);
            result.push(this.traverse(newVal))
        })
        return result;
    }
    traverseObject (obj) {
        var result={};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newVal=this.checkCond(obj[key]);
                result[key]=this.traverse(newVal);
            }
        }
        return result;
    }


}
