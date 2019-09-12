import * as Common from "../Common";
export default class BaseLogger
{
    static get LOG_ERR(){return "ERR";}
    static get LOG_INFO()    { return "INFO";}
    static get LOG_DEBUG()  {return "DEBUG";}
    constructor(serviceContainer,config)
    {
        this.serviceContainer=serviceContainer;
        this.config=config;
    }
    initialize()
    {

    }
    log(level,module,id,data)
    {
        console.log("[::"+level+"::][ MODULE: "+module+" "+id+"]"+JSON.stringify(data));
    }

}
