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
    log(level,module,id,data)
    {

        let dstam=new Date();

        console.debug("["+level+"::"+module+(id==null?"":" "+id)+"]:"+JSON.stringify(data));
    }
    exception(label,context,data)
    {
        let q=new Date();
        console.error("[["+q.toString()+" "+label+" ]] :: "+context);
        console.dir(data);
    }
}
