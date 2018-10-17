import * as Compat from '../../../Browser/CrossCompat';
import ServiceContainer from '../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../ContainerService';
import BaseContainer from '../BaseContainer.js';
import Scheduler from '../../../Browser/Scheduler';
import GPTService from '../../Ad/Display/GPT/GPTService';

/* Comportamientos de containers */
//import ExpandOnScroll from '../behaviours/ExpandOnScroll';

let sContainer=new ServiceContainer(null);
sContainer.loadServices({
    "Scheduler":{
        instance:Scheduler
    },
    "Container":{
        instance:ContainerService,
        config:{
            containers:{
                "Simple":BaseContainer
            },
            behaviours:{
                //"ExpandOnScroll":ExpandOnScroll
            }
        }
    }
});


Compat.onLoad(()=>{
   let cService=sContainer.get("Container");
   let cont=cService.getContainer({

            "type":"Simple",
            "value":{
                    "id":"root",
                    "style":{
                            width:"200px",
                            height:"200px",
                            "backgroundColor":"red"
                            }
                    },
                    "behaviours":{"ExpandOnScroll":{offset:100}}
            });
   cont.initialize();

});
