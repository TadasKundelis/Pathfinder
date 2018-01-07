var path = require('path');
var webpack = require('webpack');
var extractPlugin = require('extract-text-webpack-plugin')

var extractCss = new extractPlugin({
	filename: 'maze.css'
})

module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
	     rules: [
		    {
		        test: /\.js$/,
                use: {
				    loader: 'babel-loader',
				    options: {
					    presets: ['env']
				    }
			    }, 			
		    },
			{
				test: /\.scss$/,
                use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			}]
	 },
	 watch : true,
     stats: {
         colors: true
     },
	 plugins: [
	     extractCss
    ] 
 }