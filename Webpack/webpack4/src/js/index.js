import '../css/a.css';
import '../css/b.css';
import { mul } from './testTreeShaking';
// import '@babel/polyfill'; // 使用core-js按需加载需注释

console.log('mul:', mul(1, 1));

// import动态导入语法
// 通过js代码，让某个文件被单独打包为chunk
// 默认根据id命名，通过webpackChunkName参数更改
import(
  /* webpackChunkName: "test" */'./testCodeSplit'
).then((res) => {
  console.log('res', res);
}).catch(() => {
  console.log('文件加载失败～');
});

function add(x, y) {
  if (x === '2') {
    return x + y;
  }
  return x;
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(add(2, 5));

const add1 = (x, y) => x + y;
// eslint-disable-next-line
console.log(add1(2, 3));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行完了');
    resolve('success');
  }, 1000);
});
// eslint-disable-next-line
console.log('promise', promise);
promise.then((res) => {
  // eslint-disable-next-line
  console.log('then', res);
}).catch((err) => {
  // eslint-disable-next-line
  console.log('err', err);
});
/** 
 * 1. eslint不认识window，navigator全局变量
 * 解决：需要修改package.json中eslintConfig配置
 * "env": {
 *  "browser": true // 支持浏览器端全局变量
 * }
 * 2. sw代码必须运行在服务器上
 * --> Node.js
 * --> npm i serve -g
 *     serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/service-worker.js')
    .then(()=>{
      console.log('sw注册成功了')
    })
    .catch(()=>{
      console.log('sw注册失败了')
    })
  })
}