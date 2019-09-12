import Ads from '../Ads'
import ContainerService from '../Container/ContainerService';
import BaseContainer from '../Container/BaseContainer.js';

import GPTService from "../Ad/Display/GPT/GPTService";
import AppNexusService from "../Ad/Display/AppNexus/AppNexusService";
import ConsoleLogger from "../../Log/ConsoleLogger";
import AvaContainer from "../../Ads/Container/AvaContainer";
import Scheduled from "../Ad/behaviours/Scheduled";
//import SmartXOutStream from "../../Ad/Video/OutStream/SmartXOutStream";
import Reload from "../Ad/behaviours/Reloader";
import VideoPlayerService from "../../Video/VideoPlayerService";
import IMAService from "../Ad/Video/IMA/IMAService";
import Smartclip from "../Ad/Video/AdServers/Smartclip";
import Videojs from "../../Video/Players/Videojs";
import VideojsBehaviour from "../Container/behaviours/VideoJsBehaviour"
import RailBehaviour from "../Container/behaviours/RailBehaviour"
import VideoAdServerService from "../Ad/Video/AdServers/VideoAdServerService";

/* Comportamientos de containers */
//import ExpandOnScroll from '../behaviours/ExpandOnScroll';
Ads.boot(
    {
        "Container": {
            instance: ContainerService,
            config: {
                containers: {
                    "Simple": BaseContainer,
                    "Ava": AvaContainer

                },
                behaviours: {
                    "Videojs": VideojsBehaviour,
                    "Rail": RailBehaviour
                    //"ExpandOnScroll":ExpandOnScroll
                }
            }
        },

        "GPT": {
            instance: GPTService,
            config: {}
        },
        /*  "SmartXOutStream":{
              instance:SmartXOutStream,
              config:{}
          },*/
        "AppNexus": {
            instance: AppNexusService,
            config: {
                member: 1024
            }
        },
        "IMA": {
            instance: IMAService,
            config: {}
        },
        "VideoPlayer": {
            instance: VideoPlayerService,
            config: {
                players: {
                    "Videojs": Videojs
                }
            }
        },
        "VideoAdServer": {
            instance: VideoAdServerService,
            config: {
                adServers: {
                    "Smartclip": Smartclip
                }
            }

        }
    },
    {
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
        "railContainer":{
          container:{
              "value": {
                  behaviours: {
                      "Rail": {
                          type: "Rail",
                          config: {}
                      }
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
//            tags: ["videoSize","intext","avaContainer","refresh10"],
            tags: ["videoSize","intext","avaContainer"],
//            tags: ["roba","gpt","btf","avaContainer"],
            //tags: ["banner","appNexus","btf","avaContainer"],
        },
        "POSITION3": {
            enabled: true,
            tags:["roba","gpt","btf","simpleContainer"]
        },
        "POSITION2":{
            enabled:true,
            tags:["roba",{cond:{expr:"browser.device==\"desktop\" && rand() > 50",onTrue:"gpt",onFalse:"appNexus"}},"btf","simpleContainer"]

        }
    }
});
