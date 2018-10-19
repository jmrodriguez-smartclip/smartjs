import AdBehaviour from '../Base/AdBehaviour';

export default class Scheduled extends AdBehaviour
{
    initialize()
    {
        let scheduler=this.serviceContainer.get("Scheduler");
        this.ad.before("Requesting").wait(scheduler.schedule(this.config));
    }
}

