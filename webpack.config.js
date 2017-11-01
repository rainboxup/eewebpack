const path=require('path');
// const uglify=require('uglifyjs-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
module.exports={
	entry:{
		entry:'./src/entry.js',
		entry2:'./src/entry2.js'
	},//入口
	output:{
		path:path.resolve(__dirname,'dist'),//绝对路径
		filename:'[name].js'//生成的文件
	},//出口
	   module:{//配置loader
        rules: [
            {
              test: /\.css$/,
              use: [{
              	loader:'style-loader',
              },{
              	loader:'css-loader',
              }]
            }
          ]
    },
	plugins:[//配置插件
        new uglify()
    ],
	devServer:{//配置服务器
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.0.106',
		compress:true,
		port:8888
	}
}
