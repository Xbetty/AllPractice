let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2);
        }, 100);
      })
    );
  }, 500);
})
  .then(value => {
    console.log(value);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      });
    });
  })
  .then(console.log);

/*
 * Promise是一个代理对象，它和原先要进行的操作并无关系
 * 它通过引入一个回调，避免更多的回调
 *
 * 三个状态
 * 1.pending 待定 初始状态
 * 2.fulfilled 实现 操作成功
 * 3.rejected 被否决 操作失败
 *
 * Promise状态发生改变，就会触发then()里的响应函数处理后徐步骤
 * Promise状态一经改变，不会再变
 */

function Promise(executor) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Promise must be construted via new');
  }
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be function');
  }
  let _self = this;
  _self.data = undefined; // promise 的值
  _self.status = 'pending'; // Promise 当前的状态
  _self.onResolvedCallback = []; // Promise resolve时的回调函数集，Promise结束之前有可能有多个回调添加到它上面
  _self.onRejectedCallback = []; // Promise reject时的回调函数集，Promise结束之前有可能有多个回调添加到它上面

  // 由于 this 的原因， resolve 和 reject 定义在构造函数内外没有很大的区别
  // 操作成功， 调用 resolve 并传入 value
  function resolve(value) {
    if (_self.status === 'pending') {
      _self.status = 'resolved';
      _self._data = value;
      _self.onResolvedCallback.forEach(callback => {
        callback(value);
      });
    }
  }

  // 操作失败， 调用 reject 并传入 reason
  function reject(reason) {
    if (_self.status === 'pending') {
      _self.status = 'rejected';
      _self.status = reason;
      _self.onRejectedCallback.forEach(callback => {
        callback(reason);
      });
    }
  }

  // 考虑到 executor 执行过程中可能出错 所以用 try/catch 包起来
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  let _self = this;
  let promise2;
  // 根据标准，如果 then 的参数不是function，则我们需要忽略它
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function(v) {
          // Promise值的穿透
          return v;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(r) {
          // Promise值的穿透
          return r;
        };

  // 同步状态
  if (_self.status === 'resolved') {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // 异步执行onResolved
        try {
          let x = onResolved(_self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  // 同步状态
  if (_self.status === 'rejected') {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(_self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (_self.status === 'pending') {
    // 如果当前的 promise 还处于 pending 状态，我们并不确定调用 onResolved 还是 onRejected,
    // 只能等待 Promise 的状态确定，才能确定如何处理
    // 因此我们将两种情况的处理逻辑作为 callback 放入 promise1 的回调数组中
    return (promise2 = new Promise((resolve, reject) => {
      _self.onResolvedCallback.push(value => {
        try {
          let x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      _self.onRejectedCallback.push(value => {
        try {
          let x = onRejected(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

function resolvePromise(promise2, x, resolve, reject) {
  let then;
  let thenCalledOrThrow = false;

  if (x === promise2) {
    // 对应标准2.3.1节
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  if (x instanceof Promise) {
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === 'pending') {
      x.then(function(value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject);
    }
    return;
  }

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 即要判断它的类型，又要调用它，这就是两次读取
      then = x.then;
      if (typeof then === 'function') {
        // 2.3.3.3
        then.call(
          x,
          function rs(y) {
            // 2.3.3.3.1
            if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true;
            return resolvePromise(promise2, y, resolve, reject); // 2.3.3.3.1
          },
          function rj(r) {
            // 2.3.3.3.2
            if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        // 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // 2.3.3.2
      if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    // 2.3.4
    resolve(x);
  }
}

Promise.prototype.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = []; // 最终返回的结果
    let idx = 0;

    function processData(v, index) {
      arr[index] = v;
      if (++idx === promises.length) {
        resolve(arr);
      }
    }
    promises &&
      promises.forEach((promise, index) => {
        promise.then(value => {
          processData(value, index);
        }, reject);
      });
  });
};

Promise.prototype.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

// 生成一个成功的promise
Promise.resolve = function(value) {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};

// 生成一个失败的promise
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
let tast = (timer, light) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red();
      } else if (light === 'green') {
        green();
      } else if (light === 'yellow') {
        yellow();
      }
      resolve();
    }, timer);
  });
};

function step() {
  tast(3000, 'red')
    .then(() => tast(1000, 'green'))
    .then(() => task(2000, 'yellow'))
    .then(step);
}
step();
