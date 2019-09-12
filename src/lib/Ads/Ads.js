import ServiceContainer from '../Service/ServiceContainer'
import PageManager from './PageManager/PageManager'
import User from '../Browser/User'
import PageStats from '../Browser/PageStats'
import Scheduler from '../Browser/Scheduler';
import ConsoleLogger from '../Log/ConsoleLogger'
export default class Ads
{
    static boot(services,adsConfig)
    {
        let defaults={
            "PageManager":{instance:PageManager,config:{}},
            "Scheduler":{instance:Scheduler,config:{}},
            "Log":{instance:ConsoleLogger,config:{}},
            "PageStats":{instance:PageStats,config:{}},
            "User":{instance:User,config:{}}
        }
        for(let k in defaults)
        {
            if(services[k]===undefined)
                services[k]=defaults[k]
        }
        this.sContainer=new ServiceContainer(null);
        this.sContainer.getLoadedPromise().then(()=>{Ads.initializeStats()});
        this.sContainer.loadServices(services);
        this.adsConfig=adsConfig;
    }
    static initializeStats()
    {
        this.pageManager=this.sContainer.get("PageManager");
        this.pageManager.initialize(this.sContainer,this.adsConfig)
        this.pageManager.initialize();
    }
}
