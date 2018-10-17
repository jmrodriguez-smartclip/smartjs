import Promised from "../../../Arch/Promised"
import * as Common from "../../../Common";
export default class Ad extends Promised
{
    constructor(serviceContainer,slotId,slotConfig,config)
    {
        super();
        this.slotId=slotId;
        this.logger=serviceContainer.get("Log");
        this.logger.debug("Creando anuncio");
        this.config=config;
        this.adConfig=slotConfig.ad;
        this.container=null;
        this.adService=serviceContainer.get(this.getServiceName());
        this.behaviours={};
        this.serviceContainer=serviceContainer;

    }
    initialize()
    {
        this.prependPromises({
            "configured":"Requesting",
            "attached":this.isPrefetching()?"Displaying":"Requesting",
            "destroyed":"Destroyed",
            "ready":"Ready"}
        );
        this.before("Created").wait(this.adService.isInState("Configured"));
        if(this.adConfig.behaviours!=undefined)
        {
            for(let k in this.adConfig.behaviours)
            {
                let i=this.adConfig.behaviours[k];
                let newI=new i.type(this.serviceContainer,this,i.config);
                newI.initialize();
                this.behaviours[k]=newI;
            }



        }
        this.run(["Created","Ready","Configuring","Requesting","Displaying","Displayed","Impression","Destroyed"]);
    }

    // Created se dispara cuando hay un ad potencialmente disparable.Aun no se sabe si esta enabled o no.
    onCreated(){
        if(this.config["slots"][this.slotId].enabled)
            this.resolve("ready");
    }
    // Ready se dispara cuando se ha comprobado que este ad slot esta activo.
    onReady(){

    }
    // Configuring se dispara cuando el ad esta configurado a nivel de tamanios, targeting,etc
    onConfiguring(){
        this.logger.debug("AD::Configuring");
        this.adService.configureAd(this);
        this.resolve("configured");
    }
    // Requested se dispara cuando se realiza la peticion de anuncio al backend
    onRequesting()
    {

        this.adService.requestAd(this);
        this.logger.debug("AD::Requesting")
    }
    // Displaying se dispara cuando el anuncio ha comenzado a mostrarse
    onDisplaying(){
        this.adService.displayAd(this);
        this.logger.debug("AD::Displaying")
    }
    // Displayed se dispara cuando el anuncio ha terminado de mostrarse
    onDisplayed(){}
    // Impression se dispara cuando el anuncio ha dado impresion
    onImpression(){}
    // Destroyed es disparado cuando el anuncio es destruido desde fuera
    onDestroyed(){}
    /**
     *     UTILITY METHODS
     */
    attach(container)
    {
        this.container=container;
        this.resolve("attached");
    }
    destroy()
    {
        this.resolve("destroyed");
    }
    isPrefetching()
    {
        return this.adConfig.prefetch || false;
    }
    getServiceName()
    {
        return this.adConfig.adProvider;
    }
    getServiceParam(service,param)
    {
        if(this.adConfig[service]===undefined)
            return null;
        if(param===undefined)
            return this.adConfig[service];

        return (this.adConfig[service][param]!==undefined)?this.adConfig[service][param]:null;
    }
    getTargeting()
    {
        return {}
    }
    getSizes()
    {
        return this.adConfig.sizes===undefined?[]:this.adConfig.sizes;
    }
    getContainer()
    {
        return this.container;
    }
    getBehaviour(beh)
    {
        if(this.adConfig.behaviours===undefined)
            return null;
        if(this.adConfig.behaviours[beh]===undefined)
            return null;
        return this.adConfig.behaviours[beh].config;
    }

}