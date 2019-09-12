import * as Compat from '../../../../../Browser/CrossCompat';
import ServiceContainer from '../../../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../../../Container/ContainerService';
import BaseContainer from '../../../../Container/BaseContainer.js';
import Scheduler from '../../../../../Browser/Scheduler';
import Scheduled from '../../../../Ad/behaviours/Scheduled'
import GPTSlave from "../GPTSlave";
import AvaContainer from "../../../../Container/AvaContainer";
import VideojsBehaviour from "../../../../Container/behaviours/VideoJsBehaviour";
import ConsoleLogger from "../../../../../Log/ConsoleLogger";
import GPTService from "../GPTService";


let sContainer=new ServiceContainer(null);
sContainer.loadServices({
    "Scheduler":{
        instance:Scheduler
    },
    "Container":{
        instance:ContainerService,
        config:{
            containers:{
                "Simple":BaseContainer,
                "Ava":AvaContainer

            },
            behaviours:{
                "Videojs":VideojsBehaviour
                //"ExpandOnScroll":ExpandOnScroll
            }
        }
    },
    "Log":{
        instance:ConsoleLogger,
        config:{}
    },
    "GPTSlave":{
        instance:GPTSlave,
        config:{
            "slots": {
                "div-gpt-ad-1537188197472-0": {
                    "behaviours": {
                        "Schedule": {
                            "type": Scheduled,
                            "config": {
                                when: "LOAD",
                                timeout: 5000
                            }
                        }
                    }
                }
            }
        }
    }
});

let slave=sContainer.get("GPTSlave");
//slave.initialize();
