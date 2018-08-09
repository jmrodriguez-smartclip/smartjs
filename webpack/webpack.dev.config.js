var webpack = require('webpack');
var path = require('path');
var parentDir = path.join(__dirname, '../');


module.exports = {
	mode: "development",
	entry: [
		path.join(__dirname, '../src/index.js')
	],
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
        	rules: [
			{
            			test: /\.(js|jsx)$/,
                		exclude: /node_modules/,
                		use: 'babel-loader'
            		},
			{
                		test: /\.less$/,
                		loaders: ["style-loader", "css-loder", "less-loader"]
            		}
        		]
    	},	
	devServer:{
	   contentBase: parentDir+"/src",
	   publicPath:'/',
	   historyApiFallback:true
	}
}
