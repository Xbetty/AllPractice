/**
 * index.js：webpack入口起点文件
 * 1. 运行指令
 * 开发环境： webpack ./src/js/index.js -o ./output/index.js --mode=development
 * webpack 会以./src/js/index.js为入口文件开始打包，打包后输出到./output/index.js，整体打包环境是开发环境
 * 生产环境： webpack ./src/js/index.js -o ./output/index.js --mode=production
 * webpack 会以./src/js/index.js为入口文件开始打包，打包后输出到./output/index.js，整体打包环境是生产环境
 * 
 * 2. 结论
 * webpack能处理js/json资源，不能处理css/img等资源。
 * 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化。
 * 生产环境比开发环境多一个压缩js代码。
 */
import data from './data.json'
import '../css/index.css'
import '../css/index.less'

console.log('data',data)
document.write('webpack1')
