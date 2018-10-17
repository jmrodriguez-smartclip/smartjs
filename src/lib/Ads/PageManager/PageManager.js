
import * as Browser from "../../Browser/Browser";
import * as Cookie from "../../Browser/Cookie";

export default class PageManager
{
    constructor(serviceContainer,config)
    {
        this.serviceContainer=serviceContainer;
    }
    parse(str)
    {
        let ps=this.serviceContainer.get("PageStats");
        var stats=ps.getStats();
        console.dir(stats);
        console.dir(Browser.browserInfo());
        Cookie.setCookie("miCookie","pepito");
        console.dir(Parser.parse(str,{
            properties:{browser:Browser.browserInfo(),page:stats,getCookie:Cookie.getCookie}
        }));
    }
}