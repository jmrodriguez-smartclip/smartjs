import Service from "../Service/Service";
export default class VideoPlayerService extends Service
{
    onConfigured()
    {
        this.registeredPlayers=this.config.players;
    }
    getPlayer(config)
    {
        let containerType=config.type;
        if(typeof this.registeredPlayers[containerType]===undefined)
            throw "Unknown Container type:"+containerType;
        return new this.registeredPlayers[containerType](this,config.value);
    }
    getPlayerFromId(id)
    {
        // Todo.
        // El parametro id, es el id de un tag <video>.
        // Este metodo deberia localizar que tipo de Player es el que esta atacheado a
        // ese tag <video>.Para ello, deberia preguntar a un metodo estatico de los registeredVideoPlayers.
    }
    getLabel()
    {
        return "VideoPlayerService";
    }
}
