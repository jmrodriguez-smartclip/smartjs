
import SMCPromise from "../../../Arch/SMCPromise";
import ContainerBehaviour from "./ContainerBehaviour"
import DivNode from "../../Container/lib/DivNode"

export default class VideoJsBehaviour extends ContainerBehaviour
{
    initialize()
    {

        super.initialize()
    }
    onInitialized()
    {
        let service=this.serviceContainer.get("VideoPlayer");
        if(this.config.videoPlayerId !== undefined) {
            this.player = service.getPlayerFromId(this.config.videoPlayerId);
        }
        else
        {
            // Si no se da un id de videoPlayer, se va a crear un player nuevo.
            // Pero ese player hay que colocarlo en algun sitio.
            // Ese sitio es un div, configurado por la config actual, como si fuera
            // un container basico.
            // La diferencia es que en los VideoContainers, el nodo no es un div, sino
            // el elemento video.
            // Por eso, para crear el video, hay que primero construir el div que lo va a contener,
            // pero una vez construido el player, el nodo del container se hace que apunte al elemento video,
            // no al div que lo contiene.
            this.player=service.getPlayer({"type":"Videojs","value":{}});
            let divNode=this.container.getNode();
            this.player.initialize();
            this.player.create(divNode);
        }
    }
    onConfigured()
    {

        this.before("Ready").wait(this.player.isInState("Ready"));
    }
    onReady()
    {

    }
    /*onAttached()
    {
        var cfg=this.config;
        cfg.node=this.player.getVideoElement();
        this.divNode=new DivNode(cfg);
        console.log("ATTACHED");
    }*/
    getPlayer()
    {
        return this.player;
    }
    onDestroy()
    {
        this.container.removeBehaviour(this);
        this.player.destroy();
    }
    getLabel()
    {
        return "VideoJsBehaviour";
    }
}
