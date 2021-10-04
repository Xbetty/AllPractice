import '../css/a.css';
import '../css/b.css';
// import '@babel/polyfill'; // 使用core-js按需加载需注释

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
