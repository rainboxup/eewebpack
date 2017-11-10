const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");

console.log(encodeURIComponent(process.env.type));
if (process.env.type == "build") {
	var website = {
		publicPath: 'http://127.0.0.1:8888/'
	}
}else{
	var website = {
		publicPath: 'http://hehehe/'
	}
}
module.exports = {
	// devtool:'source-map',//调试工具
	entry: {
		entry: './src/entry.js',
	}, //入口
	output: {
		path: path.resolve(__dirname, 'dist'), //绝对路径
		filename: '[name].js', //生成的文件
		publicPath: website.publicPath
	}, //出口
	module: { //配置loader
		rules: [{
			test: /\.css$/,
			use: extractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			})
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 50000,
					outputPath: 'img/'
				}
			}]
		}, {
			test: /\.(htm|html)$/i,
			use: ['html-withimg-loader']
		}, {
			test: /\.less$/,
			use: extractTextPlugin.extract({
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}],
				fallback: 'style-loader'
			})
		}, {
			test: /\.scss$/,
			use: extractTextPlugin.extract({
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}],
				fallback: 'style-loader'
			})
		}, {
			test: /\.(jsx|js)$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: /node_modules/
		}]
	},
	plugins: [ //配置插件
		// new uglify()
		new htmlPlugin({
			minify: {
				removeAttributeQuotes: true //去除引号
			},
			hash: true, //生成hash避免出现缓存
			template: './src/index.html' //模板文件
		}),
		new extractTextPlugin('css/index.css'),
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, 'src/*.html'))
		})
	],
	devServer: { //配置服务器
		contentBase: path.resolve(__dirname, 'dist'),
		host: '127.0.0.1',
		compress: true,
		port: 8888
	}
}