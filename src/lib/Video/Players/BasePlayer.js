import * as Network from "../../Network";
import Promised from "../../Arch/Promised";
import SMCPromise from "../../Arch/SMCPromise";
import * as Browser from "../../Browser/Browser";
export default class BasePlayer extends Promised
{
    constructor(VideoPlayerService,config){
        super(VideoPlayerService.serviceContainer);
        this.videoPlayerService=VideoPlayerService;
        this.config=config;
        this.videoElement=null;
    }
    initialize()
    {

        this.prependPromises(
            {
                "dependenciesLoaded":"DependenciesLoaded",
                "create":"Created",
                //"configure":"Configured",
                "play":"Playing",
                "end":"Ended",
                "destroy":"Destroyed"
            }
        );
        this.run(["Init","DependenciesLoaded","Created","Configured","Ready","Playing","Ended","Destroyed"])


    }

    onInit()
    {
        Network.loadDependencies(this.getDependencies()).then(()=>{
            this.resolve("dependenciesLoaded")
        });
    }

    create(divNode){
        // todo
        // Detectar si en el divNode ya hay un player.En ese caso, no crear
        // el player.Configurar el player, asignar variables internas, y
        // resolver la promesa.
        this.waitFinished("DependenciesLoaded").then(()=>{
            this.createPlayer(divNode).then(()=>this.resolve("create"));
        });
    }
    /* A ser sobreescrita por las clases derivadas.
       La clase base simplemente crea un video HTML, autoresolviendo la promesa.
     */
    createPlayer()
    {
        let p=SMCPromise("CreatePlayer");
        p.resolve();
        this.createHTMLVideo(divNode);
        return p;
    }
    /*
        Keys de config de video:
        autoplay : true / false
        muted : true / false
        poster : <url de image >
     */

    createHTMLVideo(divNode)
    {
        let src=this.config.src;
        let poster=this.config.poster;
        let v=document.createElement("video");
        this.videoElement=v;
        this.videoElement.id=divNode.getId()+"-video";
        v.autoplay=this.config.autoplay===true;
        v.muted=this.config.muted===true;
        let bInfo=Browser.browserInfo();
        if(bInfo.osname==="Android" || bInfo.osname==="iOS")
            v.controls=false;
        else
            v.controls=this.config.controls===undefined?true:this.config.controls;

        if(src!==undefined && src!==null)
            v.src=src;

        if(poster!==undefined)
            v.poster=poster;

        if(this.config.width!==undefined)
            v.style.width=this.config.width;
        if(this.config.height!==undefined)
            v.style.height=this.config.height;
        divNode.appendChildNode(v);
        return v;
    }
    getVideoElement()
    {
        return this.videoElement;
    }
    getUrl()
    {
        return this.videoElement.src;
    }
    getLabel()
    {
        return "BasePlayer";
    }
    destroy()
    {

        this.videoElement.parentNode.removeChild(this.videoElement)
        this.videoElement=null;
        this.resolve("destroy");
    }
}
