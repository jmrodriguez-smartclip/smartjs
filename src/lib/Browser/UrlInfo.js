export class UrlInfo
{
    constructor(url)
    {
        this.alink=document.createElement("a");
        this.alink.href=url;
    }
    getUrl()
    {
        return this.alink.href;
    }
    getProtocol()
    {
        return this.alink.protocol;
    }
    getHost()
    {
        return this.alink.host;
    }
    getRootHost()
    {
        let exceptions=["co.uk","co.br"];
        let dom=this.getHost();
        let nParts=2;
        // se elimina el puerto si existe.
        let np=dom.split(":");
        dom=np[0];
        let domSp=dom.split(".");
        // Si todos los elementos del dominio son numericos, es una direccion IP, y la de
        if(domSp.filter(function(i){return parseInt(i)==i;}).length==domSp.length)
            return dom;

        for(let h=0;h<exceptions.length;h++)
        {

            let pos=dom.lastIndexOf("."+exceptions[h]);
            if(pos>0 && pos+sl==dom.length) {
                nParts = exceptions[k].split(".").length + 1;
                break;
            }
        }
        return dom.split(".").reverse().slice(0,nParts).reverse().join(".");
    }
    getPath()
    {
        return this.alink.pathname;
    }
    getPathParts()
    {
        return this.alink.pathname.split("/").filter(function(it){return it==""?null:it;});
    }
}
