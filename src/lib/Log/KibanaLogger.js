import "BaseLogger";

class KibanaLogger extends BaseLogger
{
    constructor(config)
    {
        super(config);
        this.config=config.kibana;
        
    }
    inmediateSend(data)
    {
        var fullRes = {data: result};
        if (navigator.sendBeacon) {
            navigator.sendBeacon(SMC.log, JSON.stringify(fullRes));
        }
        else {
            var client = new XMLHttpRequest();
            client.open("POST", SMC.log, false);
            client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            client.send(JSON.stringify(fullRes));
            }
    }
}

