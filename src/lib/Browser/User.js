import UUID from "UUID"
import Service from "../Service/Service"
import BaseLogger from "../Log/BaseLogger"
class Storage
{
    constructor(func,prefix)
    {
        this.storage=func;
        this.prefix=prefix;
        let jS=this.storage.getItem(prefix);
        if(jS)
            this.data=JSON.parse(jS);
        else
            this.data={}

    }
    get(varName,alt)
    {
        if(this.data[varName]===undefined)
        {
            if(alt===undefined)
                return null;
            this.set(varName,alt);
            return alt;
        }
        return this.data[varName];
    }
    set(varName,value)
    {
        this.data[varName]=value;
        this.save();
        return value;
    }
    setMultiple(obj)
    {
        this.data=Object.assign(this.data,obj);
        this.save();
    }
    save()
    {
        try {
            this.storage.setItem(this.prefix, JSON.stringify(this.data));

        }catch(e)
        { }
    }
}

export class LocalStorage extends Storage
{
    constructor(prefix,logger)
    {
        super(window.localStorage,prefix,logger)
    }
}
export class SessionStorage extends Storage
{
    constructor(prefix,logger)
    {
        super(window.sessionStorage,prefix,logger);
    }
}


export default class UserService
{
    constructor(serviceContainer,config)
    {
        this.local=new LocalStorage("SMCU");
        this.session=new SessionStorage("SMCU");
        this.logger=serviceContainer.get("Log");
    }
    onInitialized() {
        let consentService = null;
        try {
            consentService = serviceContainer.get("UserConsent")
        } catch (e) {
        }
        if (consentService !== null) {
            consentService.getUserConsents().then((obj) => {
                // Todo : 1) comprobar si en obj se consiente o no.
                //        2) Si no se consiente, eliminar los datos personales.
                this.assignUserId();
            })
        }
        this.assignSessionId();
    }

    assignUserId() {
        this.id=this.local.get("User_id");
        if(this.id==null)
        {
            this.id="U"+UUID()
            this.local.setMultiple(
                {
                    User_id:this.id,
                    User_created:(new Date()).getTime(),
                    User_nPages:0
                }
            )
        }
        this.logger.log(BaseLogger.LOG_INFO,"User",null,this.local.data);
    }
    assignSessionId()
    {

        this.sessionId=this.session.get("Session_id");
        if(this.sessionId==null)
        {
            this.sessionId="S"+UUID()
            this.session.setMultiple({
                        Session_id:this.sessionId,
                        Session_created:(new Date()).getTime(),
                        Session_nPages:0
                    }
                )
        }
        this.logger.log(BaseLogger.LOG_INFO,"User",null,this.session.data);
    }

    set(varName,value)
    {
        this.user.local.set(varName,value);
    }
    get(varName,defValue)
    {
        this.user.local.get(varName,defValue);
    }
    sessionSet(varName,value)
    {
        this.user.session.set(varName,value);
    }
    sessionGet(varName,defValue)
    {
        this.user.session.get(varName,defValue)
    }
}
