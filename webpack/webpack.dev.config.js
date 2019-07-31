var webpack = require('webpack');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var path = require('path');
var parentDir = path.join(__dirname, '../');


function buildTestConfiguration(moduleToTest)
{
    targetSpec= {
        mode: "development",
        devtool: "source-maps",
        devServer: {
            // .. rest of devserver options

            host: '0.0.0.0',
            disableHostCheck: true
        },
        entry: './src/'+moduleToTest+'.js',
        output: {
            path: path.resolve('dist'),
            filename: moduleToTest+'.js'
        },
        /*module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }],
        },*/

        plugins:[


        ]
    };

    console.log("FILENAME:"+moduleToTest);
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
        template:'./src/'+moduleToTest+'.html',
        filename:moduleToTest+'.html',
        inject:'head',
        alwaysWriteToDisk: true
    });
    console.log("**************INJECTED****************");
    targetSpec.plugins.push(HtmlWebpackPluginConfig);
    targetSpec.plugins.push(new HtmlWebpackHarddiskPlugin());
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

