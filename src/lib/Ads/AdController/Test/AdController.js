import * as Compat from '../../../Browser/CrossCompat';
import ServiceContainer from '../../../Service/ServiceContainer';
// Las siguientes lineas deberian ser generadas
import ContainerService from '../../Container/ContainerService';
import BaseContainer from '../../Container/BaseContainer.js';
import Scheduler from '../../../Browser/Scheduler';
import AdController from '../AdController';
import GPTService from "../../Ad/Display/GPT/GPTService";
import ConsoleLogger from "../../../Log/ConsoleLogger"
import Scheduled from "../../Ad/behaviours/Scheduled";
import Ava from "../../Ad/Video/OutStream/Ava";
import Intext from "../../Ad/Video/OutStream/Intext";
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
                when:{
                    expr:"rand() < 80",
                    onTrue:{

                    },
                    onFalse:{
                        when:{
                            "type":"rand.lastResult<90"
                        }

                    }
                },
               ad: {
                   sizes: [[300, 250]],
                   adProvider: "GPT",
                   "GPT": {
                       "adunit": "/5555/adconion.hogarutil.es/home"
                   }
               }
           },
           "delayed":{
                "ad":{
                    behaviours:{
                        "Scheduled":{type:Scheduled,config:{when:"LOAD",timeout:3000}}
                    }
                }
           },
            "banner":{sizes:[980,200]},
        "intext":{

               "ad":{
                   adProvider: "Intext",
                   "Intext": {
                       plc: "68005"
                   }
               }
        }

            },

    slots: {
        "default": {},
        "POSITION1": {
            enabled:true,
            tags: ["intext","simpleContainer"],
        },
        "POSITION3": {
            enabled: true,
            tags:["roba","simpleContainer"]

        },

        "POSITION2":{
            enabled:true,
            container:{
                "type":"Simple",
                "value":{}
            },
            ad:{
                adProvider:"Ava",
                "Ava":{
                    element_location_reference: "smartAvaReference",
                    ava : {
                        mobile :{
                            onscroll: true,
                            enabled:true,
                            initFixed : true, // Need to be true
                            keepFixed : false, //move player to spot if is in view.
                            movePlayerCap : 2,
                            nonstop : false,
                            skipOffset : 5, // if 0 is disabled, if want to enable change to secs to skip
                            skipText : "",
                            playerHeight : 197, //   16/9 please
                            playerWidth: 350,
                            player_margin_bottom: 5,
                            player_margin_right: 5,
                            //css:["https://s3-eu-west-1.amazonaws.com/sc-video-campaigns/ava/sc-inview_fixed_intext_desktop_hu.css"],
                            css: [],
                            fixedClass : "fixed_intext_sc_mob_v1",
                            js : [],
                            margin_top : 0,
                            margin_bot: 0,
                            freq : 0,
                            smaracd_player : "hogarutil.es.intxt.ava.mob.html5.smartclip"
                        },
                        web: {
                            onscroll: true,
                            enabled:true,
                            initFixed : true,
                            keepFixed : false, //move player to spot if is in view.
                            movePlayerCap : 2,
                            nonstop : false,
                            skipOffset : 5, // if 0 is disabled, if want to enable change to secs to skip
                            skipText : "",
                            playerHeight : 197, //   16/9 please
                            playerWidth: 350,
                            player_margin_bottom: 10,
                            player_margin_right: 5,
                            //css:["https://s3-eu-west-1.amazonaws.com/sc-video-campaigns/ava/sc-inview_fixed_intext_desktop_hu.css"],
                            css: [],
                            fixedClass : "fixed_intext_sc_v1",
                            js : [],
                            margin_top : 0,
                            margin_bot: 0,
                            freq : 0,
                            smaracd_player : "hogarutil.es.intxt.ava.html5.smartclip"

                        }
                    },
                    inphoto : {
                        mobile :{
                            enabled : true,
                            minWidth : 290,
                            ratio : 16/9,
                            impsPerPageLoaded : 1,
                            frequence : 0,
                            skipOffset : 5, // 0 is disabled
                            skipText : "",
                            smaracd_player : "hogarutil.es.intxt.inphoto.mob.html5.smartclip"
                        },
                        web :{
                            enabled : true,
                            minWidth : 290,
                            ratio : 16/9,
                            impsPerPageLoaded : 1,
                            frequence : 0,
                            skipOffset : 5, //0is disabled
                            skipText : "",
                            smaracd_player : "hogarutil.es.intxt.inphoto.html5.smartclip"
                        }
                    },
                    ava_desk : {
                        skipOffset : 5,
                        skipText : ""
                    }

                }
            }
        },

    }
};


Compat.onLoad(()=>{
    let controller=new AdController(sContainer,"POSITION1",document.getElementById("root"),sampleAdConfig);
    controller.initialize();
    //let controller1=new AdController(sContainer,"POSITION1",document.getElementById("intext"),sampleAdConfig);
    //controller1.initialize();
    let controller2=new AdController(sContainer,"POSITION3",document.getElementById("intext2"),sampleAdConfig);
    controller2.initialize();
});
