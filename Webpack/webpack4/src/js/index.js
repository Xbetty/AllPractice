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
