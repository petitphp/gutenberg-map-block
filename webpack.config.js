const webpack = require( 'webpack' );

module.exports = {
	entry: './assets/js/block.js',
	output: {
		path: __dirname + '/assets/js/',
		filename: 'block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: ( 'production' === process.env.NODE_ENV ) ? [ new webpack.optimize.UglifyJsPlugin() ] : []
};