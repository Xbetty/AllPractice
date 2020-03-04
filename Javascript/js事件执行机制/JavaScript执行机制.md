#### 1. JavaScript是一门单线程语言
> JavaScript是一门单线程语言，在最新的HTML5中提出了Web-Worker，但JavaScript是单线程这一核心仍未改变。所以一切JavaScript版的“多线程”都是用单线程模拟出来的，一切JavaScript多线程都是假的。

#### 2. 事件循环
 同步任务 和 异步任务
- 同步和异步任务分别进入不同的执行“场所”，同步的进入主线程，异步的进入Event Table并注册函数
- 当指定的事情完成时，Event Table会将这个函数移入Event Quene
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行
- 上述过程会不断重复，也就是常说的Event Loop（事件循环）

> Q1: 怎么知道主线程执行栈为空？    
> 答： js 引擎在monitoring process进程，会持续不断的检查主线程执行站是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

#### 3. setTimeout
关于setTimeout，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4ms。
> Q2：setTimeout(fn,0)的含义是什么？0秒后执行又是什么意思呢？是不是可以立即执行？
> 答：setTimeout(fn, 0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。

#### 4. setInterval
setInterval是循环的执行。对于执行顺序来说，setInterval会每隔指定的时间将注册的函数置入Event Queue，如果前面的任务耗时太久，那么同样需要等待。

> 注：setInterval(fn,ms) 不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue。一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。

#### 5. Promise 与 process.nextTick(callback)
process.nextTick(callback)类似node.js版的“setTimeout”，在事件循环的下一次循环中调用callback回调函数。

- macro-task（宏任务）：包括整体代码script，setTimeout，setInterval
- micro-task（微任务）：Promise，process.nextTick

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。

##### 事件循环的顺序（决定js代码的执行顺序）：    
进入整体代码（宏任务）后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。
