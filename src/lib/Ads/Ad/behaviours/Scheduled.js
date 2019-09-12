import AdBehaviour from '../Base/AdBehaviour';

export default class Scheduled extends AdBehaviour
{
    initialize()
    {
        let scheduler=this.serviceContainer.get("Scheduler");
        this.ad.before("Ready").wait(scheduler.schedule(this.config));
        super.initialize()
    }
}

