import ServiceContainer from "../../lib/Service/ServiceContainer"
import PageStats from "../../lib/Browser/PageStats";
export default class SampleProject
{
    doit()
    {
        let sc=new ServiceContainer(null);
        sc.loadServices({
            "PageStats":{
                "instance":PageStats,
                config:{}
            }
        });

        let ps=sc.get("PageStats");
        console.dir(ps.getStats());
    }
}
