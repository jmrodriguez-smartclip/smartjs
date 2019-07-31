import BasePlayer from "./BasePlayer";
import * as Browser from "../../Browser/Browser"
import SMCPromise from "../../Arch/SMCPromise"
export default class Videojs extends BasePlayer
{
    getDependencies()
    {
        return {
            "css":[
                "//vjs.zencdn.net/5.3/video-js.min.css"
            ],
            "scripts":[
                "//vjs.zencdn.net/5.3/video.min.js"
            ]
        };
    }
    // Esta funcion debe devolver una promesa.Ver la clase base.
    createPlayer(divNode)
    {
        let p=SMCPromise("Videojs:createPlayer");
        p.resolve();

        this.videoElement=this.createHTMLVideo(divNode);
        this.videoElement.className="video-js vjs-default-skin"
        let player = window.videojs(this.videoElement.id);
        return p;
    }

}
