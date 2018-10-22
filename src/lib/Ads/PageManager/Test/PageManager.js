import * as Compat from '../../../Browser/CrossCompat';
import ServiceContainer from '../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../Container/ContainerService';
import BaseContainer from '../../Container/BaseContainer.js';
import Scheduler from '../../../Browser/Scheduler';
import GPTService from "../../Ad/Display/GPT/GPTService";
import AppNexusService from "../../Ad/Display/AppNexus/AppNexusService";
import ConsoleLogger from "../../../Log/ConsoleLogger";
import Ava from "../../Ad/Video/OutStream/Ava"
import Scheduled from "../../Ad/behaviours/Scheduled";
import Intext from "../../Ad/Video/OutStream/Intext";
import PageManager from "../PageManager";
import PageStats from "../../../Browser/PageStats"

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
    },
    "AppNexus":{
        instance:AppNexusService,
        config:{
            member: 1024
        }
    }
});

let sampleAdConfig={
    tags:{
        "simpleContainer":{
            container: {
                "type": "Simple",
                "value": {
                    "style": {
                        "border": "1px solid black"
                    }
                }
            }
        },
        "roba": {
            ad: {
                sizes: [[300, 250]]
            }
        },

        "delayed":{
            "ad":{
                behaviours:{
                    "Scheduled":{type:Scheduled,config:{when:"LOAD",timeout:3000}}
                }
            }
        },
        "banner":{
            "ad":{
                sizes:[980,200]
            }
        },
        "intext":{

            "ad":{
                adProvider: "Intext",
                "Intext": {
                    plc: "68005"
                }
            }
        },
        "gpt": {
            "ad":{adProvider:"GPT"}
        },
        "appNexus":{
            "ad":{
                adProvider:"AppNexus"
                }
        },
        "btf":{
            "ad": {
                "GPT": {
                    "adunit": "/5555/adconion.hogarutil.es/home"
                },
                "AppNexus": {
                    "adunit":11173262
                }
            }
        }
    },
    slots: {
        "default": {},
        "POSITION1": {
            enabled:true,
            tags: ["roba","intext","simpleContainer"],
        },
        "POSITION3": {
            enabled: true,
            tags:["roba","gpt","btf","simpleContainer","delayed"]
        },
        "POSITION2":{
            enabled:true,
            tags:["roba",{cond:{expr:"browser.device==\"desktop\" && rand() > 50",onTrue:"gpt",onFalse:"appNexus"}},"btf","simpleContainer"]

        }
    }
};


let inst=new PageManager(sContainer,sampleAdConfig);
inst.initialize();