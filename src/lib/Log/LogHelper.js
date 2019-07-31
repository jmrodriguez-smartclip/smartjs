export default class LogHelper
{
    constructor(serviceContainer,module,identifier,instance)
    {
        this.logger=serviceContainer.get("Logger");
        this.module=module;
        this.identifier=identifier;
    }
    log(data)
    {
        this.logger(BaseLogger.LOG_INFO,this.module,this.identifier,e.toString());
    }
    debug(data)
    {
        this.logger(BaseLogger.LOG_DEBUG,this.module,this.identifier,e.toString());
    }
    // Identifier identifica una instancia en concreto.Si es un singleton, con el nombre es bastante.
    // Si no, se asignarian ids a cada una de las instancias.
    // El contexto es el metodo / zona donde ocurre la excepcion
    error(identifier,context,text)
    {

        this.logger(BaseLogger.LOG_ERR,this.module,this.identifier,e.toString());
    }
    exception(identifier,context,exception)
    {

        this.logger(BaseLogger.LOG_ERR,this.module,this.identifier,e.toString());
    }
}
