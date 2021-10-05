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
import data from './data.json';
import '../css/index.css';
import '../css/index.less';
import '../fonts/iconfont.css';
import print from './print';

console.log('data1133', data);
console.log('index.js文件被加载了～');
print();

if (module.hot) {
  // 一旦module.hot为true，说明开启了HMR功能 --> 让HMR代码功能生效
  module.hot.accept('./print.js', () => {
    // 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建
    // 会执行后面的回调函数
    console.log('监听到print.js');
    print();
  });
}
