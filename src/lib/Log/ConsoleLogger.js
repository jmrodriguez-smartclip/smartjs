import BaseLogger from './BaseLogger';
import * as Common from '../Common.js';
export default class ConsoleLogger extends BaseLogger
{
    debug(txt)
    {
        if(!Common.isArray(txt))
            txt=[txt];
        for(var k=0;k<txt.length;k++)
        {
            if(typeof txt[k]==="string")
                console.log(txt[k]);
            else
                console.dir(txt[k]);
        }
    }
    log(index,sourceData,inmediate=0)
    {
        let dstam=new Date();

        for(let k in sourceData)
        {
            let c=sourceData[k];
            console.debug("["+index+"]"+k);
            for(let j in c)
            {
                console.debug("["+index+"]:"+k+":"+j+"="+c[j]);
            }
        }
    }
}