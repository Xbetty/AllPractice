import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container  = document.getElementById('container')

// snabbdom github案例
// 创建虚拟节点1
const myVnode1 = h('a', {props: {
  href: 'http://www.baidu.com'
}}, 'xzt')
// console.log('myVnode1:',myVnode1)
// 让虚拟节点上树
// patch(container, myVnode1) // 一次只能一个节点上树

// 创建虚拟节点2
const myVnode2 = h('div', {class:'box'}, '我是一个div')
console.log('myVnode2:',myVnode2)
// patch(container, myVnode2)

// 创建虚拟节点3
const myVnode3 = h('ul', [
  h('li','苹果'),
  h('li', h('span', '西瓜')),
  h('li',[
    h('div', '哈哈'),
    h('div', '嘻嘻')
  ]),
])
console.log('myVnode3:',myVnode3)
patch(container, myVnode3)