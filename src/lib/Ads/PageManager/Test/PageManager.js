import * as Compat from '../../../Browser/CrossCompat';
import ServiceContainer from '../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../Container/ContainerService';
import BaseContainer from '../../Container/BaseContainer.js';
import Scheduler from '../../../Browser/Scheduler';
import GPTService from "../../Ad/Display/GPT/GPTService";
import AppNexusService from "../../Ad/Display/AppNexus/AppNexusService";
import ConsoleLogger from "../../../Log/ConsoleLogger";
import AvaContainer from "../../../Ads/Container/AvaContainer";
import Scheduled from "../../Ad/behaviours/Scheduled";
//import SmartXOutStream from "../../Ad/Video/OutStream/SmartXOutStream";
import PageManager from "../PageManager";
import PageStats from "../../../Browser/PageStats"
import Reload from "../../Ad/behaviours/Reloader";
import VideoPlayerService from "../../../Video/VideoPlayerService";
import IMAService from "../../Ad/Video/IMA/IMAService";
import Smartclip from "../../Ad/Video/AdServers/Smartclip";
import Videojs from "../../../Video/Players/Videojs";
import VideojsBehaviour from "../../Container/behaviours/VideoJsBehaviour"
import VideoAdServerService from "../../Ad/Video/AdServers/VideoAdServerService";
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
                "Simple":BaseContainer,
                "Ava":AvaContainer

            },
            behaviours:{
                "Videojs":VideojsBehaviour
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
  /*  "SmartXOutStream":{
        instance:SmartXOutStream,
        config:{}
    },*/
    "AppNexus":{
        instance:AppNexusService,
        config:{
            member: 1024
        }
    },
    "IMA":{
        instance:IMAService,
        config:{

        }
    },
    "VideoPlayer":{
        instance:VideoPlayerService,
        config:{
            players:{
                "Videojs":Videojs
            }
        }
    },
    "VideoAdServer":{
        instance:VideoAdServerService,
        config:{
            adServers:{
                "Smartclip":Smartclip
            }
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
        "avaContainer":{
            container: {
                "type": "Ava",
                "value": {
                    "id":"div-gpt-ad-1537188197472-0",
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
        "videoSize":{
          ad:{
              sizes:[[640,480]]
          }
        },

        "delayed":{
            "ad":{
                behaviours:{
                    "Scheduled":{type:Scheduled,config:{when:"LOAD",timeout:3000}}
                }
            }
        },
        "refresh10":{
            "ad":{
                behaviours:{
                    "Reloader":{
                        type:Reload,
                        config: {
                            maxReloads: 3,
                            timeout: 10000,
                            maxBlankReloads: 2,
                            blankTimeout: 1000,
                            disabledAdvertisers:[],
                            disabledLineItems:[]
                        }
                    }
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
                adProvider: "IMA",
                "IMA": {
                    adserver:{
                        "type":"Smartclip",
                        "value":{
                            plc: "68005",
                            ple:"hogarutil.brightcove.pf.es.smartclip~~400x320"
                        }
                    }
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
                    "adunit":9502751
                }
            }
        }
    },

    slots: {
        "default": {},
        "POSITION1": {
            enabled:true,
            tags: ["videoSize","intext","avaContainer","refresh10"],
            //tags: ["roba","gpt","btf","avaContainer"],
            //tags: ["banner","appNexus","btf","avaContainer"],
        },
        "POSITION3": {
            enabled: true,
            tags:["roba","gpt","btf","avaContainer"]
        },
        "POSITION2":{
            enabled:true,
            tags:["roba",{cond:{expr:"browser.device==\"desktop\" && rand() > 50",onTrue:"gpt",onFalse:"appNexus"}},"btf","simpleContainer"]

        }
    }
};


let inst=new PageManager(sContainer,sampleAdConfig);
sContainer.add("PageManager",inst);
inst.initialize();
