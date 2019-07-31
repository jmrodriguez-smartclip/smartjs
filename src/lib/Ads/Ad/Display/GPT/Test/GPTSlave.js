import * as Compat from '../../../../../Browser/CrossCompat';
import ServiceContainer from '../../../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../../../Container/ContainerService';
import BaseContainer from '../../../../Container/BaseContainer.js';
import Scheduler from '../../../../../Browser/Scheduler';
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
    "GPT":{
        instance:GPTService,
        config:{}
    },
    "GPTSlave":{
        instance:GPTSlave,
        config:{}
    }
});

let slave=sContainer.get("GPTSlave");
slave.initialize();
