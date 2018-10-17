import PageManager from "../PageManager"
import * as Compat from '../../../Browser/CrossCompat';
import ServiceContainer from '../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../Container/ContainerService';
import BaseContainer from '../../Container/BaseContainer.js';
import Scheduler from '../../../Browser/Scheduler';
import GPTService from "../../Ad/Display/GPT/GPTService";
import ConsoleLogger from "../../../Log/ConsoleLogger"
import Scheduled from "../../Ad/behaviours/Scheduled";
import Ava from "../../Ad/Video/OutStream/Ava";
import Intext from "../../Ad/Video/OutStream/Intext";
import PageStats from "../../../Browser/PageStats";

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
    },
    "PageStats":{
        instance:PageStats,
        config:{}

    },

    "Log":{
        instance:ConsoleLogger,
        config:{}
    },
    "GPT":{
        instance:GPTService,
        config:{}
    },
    "Intext":{
        instance:Intext,
        config:{}
    },
    "Ava":{
        instance:Ava,
        config:{}
    }
});

let a=new PageManager(sContainer,{});
//a.parse("browser.browserAgent matches \"Android\" || page.url matches \"hogarm\" || getCookie(\"miCookie\")==\"pepito\"");
a.parse("getCookie(\"miCookie\")==\"pepito2\"");

