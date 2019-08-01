import * as Compat from "../../../Browser/CrossCompat"
import SMCPromise from "../../../Arch/SMCPromise"
const positionalProperties=["position","top","left","width","height","display","float"];
export default class DivNode
{
    constructor(nodeSpec)
    {
        this.node=null;
        this.properties={};
        this.createdPromise=SMCPromise();
        let f=()=>{
            this.createNode(nodeSpec);
            if(this.node!==null)
                this.createdPromise.resolve();
        }
        f();
        if(this.node==null)
        {
            document.addEventListener("ready",f)
        }
        this.createdPromise.then(()=>{
            if(this.node && nodeSpec.style !== undefined)
                this.applyStyles(nodeSpec.style);
        });
    }
    createNode(nodeSpec)
    {
        if(nodeSpec.node !== undefined)
            this.node=nodeSpec.node;
        else {
            if (nodeSpec.id !== undefined) {
                this.node = document.getElementById(nodeSpec.id);
            }
            else {
                if (nodeSpec.query !== undefined) {
                    var list = [].slice.call(document.querySelectorAll(nodeSpec.query));
                    this.node = list.length > 0 ? list[0] : null;
                }
                else {
                    if (nodeSpec.tag !== undefined) {
                        this.node = document.createElement(nodeSpec.tag);
                        if (nodeSpec.parent !== null && nodeSpec.parent!==undefined)
                            nodeSpec.parent.addChild(this);
                    }
                }
            }
        }
    }
    getPromise()
    {
        return this.createdPromise;
    }
    getParent()
    {
        if(this.node!==null)
            return new DivNode({node:this.node.parentElement});
        return null;
    }
    addChild(node)
    {
        if(this.node==null)
            return;
        this.node.appendChild(node.getNode())
    }
    appendChildNode(node)
    {
        if(this.node==null)
            return;
        this.node.appendChild(node)
    }
    applyStyles(styles)
    {
        if(this.node==null) return;
        for (var k in styles)
            this.node.style[k] = styles[k];
    }
    getStyles(styles)
    {
        if(this.node===null)
            return null;
        var res={};
        styles.map((i)=>res[i]=this.node.style[i]);
        return res;
    }
    getPositionalProperties()
    {
        return this.getStyles(positionalProperties);
    }
    getNode()
    {
        return this.node;
    }
    getId()
    {
        if(this.node===null)
            return null;
        return this.node.id;
    }
    addProperty(key, value)
    {
        if(this.node===null)
            return;
        this.properties[key]=value;
    }
    removeProperty(key)
    {
        delete this.properties[key];
    }
    getProperty(key)
    {
        return this.properties[key] || null;
    }
    addClass(className)
    {
        // classList no es soportado en versiones anteriores a 10..
        var curClasses=this.node.className.split(" ").filter(function(f){return f!==className});
        curClasses.push(className);
        this.node.className=curClasses.join(" ");
    }
    removeClass(className)
    {
        this.node.className=this.node.className.split(" ").filter(function(f){return f!==className}).join(" ");
    }
    remove() {
        this.node.parentNode.removeChild(this.node);
    }
}
