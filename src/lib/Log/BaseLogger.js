
export default class BaseLogger
{
    constructor(config)
    {
        this.logStack=[];
        this.config=config;
    }
    initialize()
    {

    }
    log(index,sourceData,inmediate=0)
    {
        let dstam=new Date();
        let log= {
            index: index,
            timestamp: dstam.getTime()
        };
        for(let k in sourceData)
        {
            let c=sourceData[k];
            for(let j in c)
                log[k+_+j]=c[j];
        }
        if(inmediate)
            this.inmediateSend([log]);
        else
            this.logStack.push(log);
    }
    inmediateSend(dataArray)
    {

    }
    flush()
    {
        if(this.logStack.length > 0)
            this.inmediateSend(this.logStack);
        this.logStack=[];
    }
}