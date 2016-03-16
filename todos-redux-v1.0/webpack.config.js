var path = require("path");
module.exports = {
	entry : './index.js',
	module : {
		loaders : [
			{
				loader : 'babel-loader',
				test : /\.js$/,
				exclude : /node_modules/
			}
			, {
		      test: /\.css?$/,
		      loaders: [ 'style', 'css'],
		      include: __dirname,
		      exclude : /node_modules/
		    }
		]
	},
	output: {
		filename: "main.bundle.js",
		path: __dirname + "/dist",
		publicPath:'/dist'
	},
	devServer : {
		publicPath : '/dist',
		filename : 'main.bundle.js',
		host : '0.0.0.0',
		port : 8080
	}
}