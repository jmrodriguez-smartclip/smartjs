var webpack = require('webpack');
var path = require('path');
var parentDir = path.join(__dirname, '../');


function buildTestConfiguration(moduleToTest)
{
    targetSpec= {
        mode: "development",
        devtool: "source-maps",
        entry: './src/'+moduleToTest+'.js',
        output: {
            path: path.resolve('dist'),
            filename: moduleToTest+'.js'
        },
        plugins:[]
    };

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
        template:'./src/'+moduleToTest+'.html',
        filename:moduleToTest+'.html',
        inject:'body'
    });
    targetSpec.plugins.push(HtmlWebpackPluginConfig);
    return targetSpec;
}


module.exports = function(env,argv)
{
    if(argv["test"])
    {
        // Se quiere generar un test de un modulo.
        // El valor de la variable
        return buildTestConfiguration(argv["test"]);
    }
    console.error("Especifica un modulo a testear con el parametro test")

    return null;


};

