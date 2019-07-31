import AdService from "../../Base/AdService";
import * as Network from "../../../../Network";
import SMCPromise from "../../../../Arch/SMCPromise";
import AdVideoRequest from "../AdVideoRequest";


export default class SmartXOutStream extends AdService
{
    onInitialized(){
        this.loaded=false;
        this.loadPromise=SMCPromise();

    }
    onConfigured(){
    }
    onReady(){}

    onEvent(id,slot,message) {
    }
    requestAd(ad)
    {
        this.ad=ad;
        ad.before("Displaying").wait(this.loadPromise);
        var playerService=this.serviceContainer.get("VideoPlayerService");
        var player=playerService.getPlayer(this.config.player);


        return new AdVideoRequest(this.serviceContainer, ad)
    }
    createVideo(config)
    {
        let conf = {
            "autoplay" :true,
            "muted" :true,
            "poster" :"",
            "width" :"300px",
            "heigth" :"200px",
            "content_video" :"https://ad.sxp.smartclip.net/select?type=dyn&ple=hogarutil.brightcove.pf.es.smartclip~~400x320&cu_rmtdom=&smar_fc=req&smar_cors=0&fwd_dt1=&fwd_dt2=&ref=https%3A%2F%2Fwww.hogarmania.com%2Fcocina%2Frecetas%2Fcarnes%2F201702%2Falbondigas-pure-patata-35179.html&fwd_sz=400x320&&rnd=99708465"
        };
        /**
         * Copyright 2014 Google Inc.
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *     http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        let vjsOptions=null;
        let contId=this.ad.getContainer().id+"-video";

        var video = '<video id="content_video" '+conf.muted+' playsinline preload="auto" class="video-js vjs-default-skin" '+conf.autoplay+'  controls poster="'+conf.poster+'" width="'+conf.width+'" height ="'+conf.heigth+'"  data-setup=\'{  "sources": [{ "type": "video/mp4", "src": "'+conf.content_video+'"}] }\' ></video>';

        if (conf.autoplay == "true")
            vjsOptions = {
                autoplay: true,
                muted: true
            }




        player.ima(options);

// Remove controls from the player on iPad to stop native controls from stealing
// our click

// Initialize the ad container when the video player is clicked, but only the
// first time it's clicked.
        var startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            startEvent = 'touchend';
        }

        if (QueryPath.autoplay == "true"){

            player.ima.initializeAdDisplayContainer(); player.ima.requestAds(); player.play();
        }else{
            player.one(startEvent, function() {
                player.ima.initializeAdDisplayContainer();
                player.ima.requestAds();
                player.play();
            });
        }
//custom events


        player.on('adstart', function() {
            window.addEventListener("resize", function(){

                document.getElementsByTagName("div")[0].style.height = window.getComputedStyle(document.body).width.split("px")[0]/1.7777777777777777 + "px"
                document.getElementsByTagName("div")[0].style.width = window.getComputedStyle(document.body).width
                document.querySelectorAll("#content_video_ima-ad-container > div")[0].style.width = window.getComputedStyle(document.body).width;
                document.querySelectorAll("#content_video_ima-ad-container > div")[0].style.height = window.getComputedStyle(document.body).width.split("px")[0]/1.7777777777777777 + "px"
                window.parent.postMessage("AD_RESIZE&CONTAINER:" + QueryPath.container,"*")
            });

            console.log("AD_STARTED");
            window.parent.postMessage("AD_STARTED&CONTAINER:" + QueryPath.container,"*")
        });
        player.on('adend', function() {
            console.log("AD_ENDED");
            window.parent.postMessage("AD_ENDED&CONTAINER:" + QueryPath.container,"*")
        });
        player.on('adskip', function() {
            console.log("AD_SKIPPED");
            window.parent.postMessage("AD_SKIPPED&CONTAINER:" + QueryPath.container,"*")
        });
        player.on('adtimeout', function() {
            console.log("AD_TIMEOUT");
            window.parent.postMessage("AD_TIMEOUT&CONTAINER:" + QueryPath.container,"*")
        });
        player.on('readyforpreroll', function() {
            console.log("AD_READYFORPREROLL");
            window.parent.postMessage("AD_AVAILABLE&CONTAINER:" + QueryPath.container,"*")
        });
        player.on('playing', function() {
            console.log("PLAYING");
            window.parent.postMessage("CONTENT_PLAYING&CONTAINER:" + QueryPath.container,"*")

        });
        player.on('ended', function() {
            console.log("VIDEO_ENEDED");
            window.parent.postMessage("CONTENT_ENDED&CONTAINER:" + QueryPath.container,"*")
        });

        player.on('adserror', function(data) {

            console.log("AD_ERROR");
            console.log('Ad error Code: ' + data.data.AdError.h);
            console.log('Ad error Message: ' + data.data.AdError.l);
            window.parent.postMessage("AD_ERROR&CONTAINER:" + QueryPath.container + "&ERROR_MESSAGE:" + data.data.AdError.l + "&ERROR_CODE:" + data.data.AdError.h,"*")
        });

        let plc=this.ad.getServiceParam("SmartXOutStream","plc");
       // "https://ad.sxp.smartclip.net/select?type=dyn&ple=hogarutil.brightcove.pf.es.smartclip~~400x320&cu_rmtdom=&smar_fc=req&smar_cors=0&fwd_dt1=&fwd_dt2=&ref=https%3A%2F%2Fwww.hogarmania.com%2Fcocina%2Frecetas%2Fcarnes%2F201702%2Falbondigas-pure-patata-35179.html&fwd_sz=400x320&&rnd=99708465"



        this.ad.getContainer().getNode().getNode().innerHTML=video;


    }
    displayAd(ad)
    {


    }
    configureAd(ad)
    {

    }

}

