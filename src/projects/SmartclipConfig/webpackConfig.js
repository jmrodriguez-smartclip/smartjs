let glob=require("glob");
let webpack=require("webpack");
let axios=require("axios");

/*******************************************
 *  CONFIG VARIABLES
 */
const sysconfig={
    siteConfigPath:'https://a482323.storage.oraclecloud.com/v1/Storage-a482323/smartclip-services/HeaderBidding/js/configs/',
    sampleConfigPath:'./src/configs'
};

const path = require('path');

let s=require.context;

let targetMode="development";
let targetFile="*";
let entry={};
let plugins=[];

/**
 * Devuelve la configuracion final para webpack, una vez que se conocen los entry points, y los plugins se han inicializado.
 * @param entrySpec
 *
 * @returns {{mode: string, devtool: string, entry: *, output: {path: *, filename: string}, plugins: *[]}}
 */
function buildConfiguration(entrySpec)
{

    let targetSpec= {
        mode: targetMode,
        devtool: "source-maps",

        entry: entrySpec,
        output: {
            path: path.resolve('dist'),
            filename: 'SmartclipConfig.js'
        },
        plugins:plugins
    };
    if(targetMode=="development")
    {
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            inject:'body'
        });
        targetSpec.plugins.push(HtmlWebpackPluginConfig);
    }
    return targetSpec;
}

/**
 * Obtiene la configuracion de produccion del site dado por configName
 * @param configName
 * @returns {Promise<any>}
 */
function loadRemoteConfiguration(configName)
{
    console.log("REQUESTING "+sysconfig.siteConfigPath+targetFile+".js");
    var p=new Promise(function(resolve,reject){
        axios.get(sysconfig.siteConfigPath+targetFile+".js").then(function(v){
            resolve(v.data);
        })
    })
    return p;
}

/**
 * Obtiene la configuracion de test dado por configName.Debe existir en ./src/configs. Por defecto, la configuracion
 * cargada es "testConfig".
 * @param configName
 * @returns {Promise<any>}
 */
function loadLocalConfiguration(configName)
{
    let p=new Promise(function(resolve,reject){

        let fs=require("fs");
        let targetDir=sysconfig.sampleConfigPath;
        let targetFile=targetDir+'/'+configName+'.json';
        console.log("LOADING LOCAL FILE "+targetFile);
        if(!fs.existsSync(targetFile))
        {
            reject();
        }
        let contents=fs.readFileSync(targetFile,"utf8");
        resolve(contents);
    });
    return p;
}

/**
 * A partir de la configuracion en texto (content), genera un fichero js que actua como punto de entrada (entry) para
 * crear la distribucion customizada
 * @param configName
 * @param content
 */
function saveEntryPoint(configName, content)
{

    content=content.replace(/^SMC.Config.process\(/,'');
    content=content.replace(/\);$/,'');
    // Se eliminan comentarios
    content=content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

    let obj=JSON.parse(content);
    if(obj != undefined)
    {
        /* Ahora hay que hacer 2 cosas: 1) obtener la lista de plugins usados. 2) Generar el entry point (main) */
        if(obj.actions != undefined)
        {
            let usedPlugins={};
            for(let k=0;k<obj.actions.length;k++)
            {
                let ca=obj.actions[k];
                if(ca.actions != undefined)
                {
                    for(let j in ca.actions)
                    {
                        usedPlugins[j]=1;
                    }
                }
            }
            let code='/** Generated code from config. Please dont modify **/\n';
            for(let k in usedPlugins)
            {
                code+='import * as '+k+' from \'../SMC/Plugins/'+k+'/'+k+'.js\';\n';
            }
            code+='import * as SMC from \'../SMC/SMC.js\';\n';
            code+='SMC('+content+');';
            let fs=require("fs");
            let targetDir='./src/entry';
            if (!fs.existsSync(targetDir)){
                fs.mkdirSync(targetDir);
            }
            let targetFile=targetDir+'/index.js';
            fs.writeFileSync(targetFile, code);
        }
    }
}

export function buildEntry(env)
{
    let p=null;

    if(env=="development")
        targetFile="testConfig";
    if(targetFile!="*") {
        let localPromise=new Promise(
            function(resolve,reject)
            {
                p = (env == "development")? loadLocalConfiguration("testConfig"):loadRemoteConfiguration(targetFile);
                p.then(function(result){
                    saveEntryPoint(targetFile,result);
                    console.log("RESOLVING LOCAL PROMISE");
                    resolve(buildConfiguration('./src/entry/index.js'));
                })
            }
        );

        console.log("RETURNING LOCAL PROMISE");
        return localPromise;
    }


    /*if(targetFile=="*")
    {
        let files=glob.sync("./src/configs/*.js",{});
        files.map(function(i){
            entry['configs/'+(i.split('/').pop().split("."))[0]+'/SmartclipConfig.js']=i;
        });
    }
    else
    {
        entry['configs/'+targetFile+'/SmartclipConfig.js']='./src/configs/'+targetFile+'.js';
    }*/
}

