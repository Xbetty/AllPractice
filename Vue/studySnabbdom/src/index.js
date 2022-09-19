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

const container = document.getElementById("container");
const btn = document.getElementById("btn");

// 创建虚拟节点1
const vnode1 = h("ul", [
  h("li", "A"),
  h("li", "B"),
  h("li", "C"),
  h("li", "D"),
]);
// 创建虚拟节点1_key
const vnode1_key = h("ul", [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);
console.log("vnode1:", vnode1);
// patch(container, vnode1);
patch(container, vnode1_key);

// // 创建虚拟节点2
// const vnode2 = h("ul", [
//   h("li", "A"),
//   h("li", "B"),
//   h("li", "C"),
//   h("li", "D"),
//   h("li", "E"),
// ]);
// // 点击按钮时，把vnode1变为vnode2
// btn.onclick = () => {
//   patch(vnode1, vnode2);
  // 原来abcd的节点没变，在尾部新增了e节点，验证方法：控制台更新abcd的值，然后点击按钮更新dom，abcd的值不变
// };

// // 创建虚拟节点3
// const vnode3 = h("ul", [
//   h("li", "E"),
//   h("li", "A"),
//   h("li", "B"),
//   h("li", "C"),
//   h("li", "D"),
// ]);
// // 点击按钮时，把vnode1变为vnode3
// btn.onclick = () => {
//   patch(vnode1, vnode3);
//   // 控制台更新abcd的值，点击按钮，节点全部更新
// };



// 创建虚拟节点3_key
const vnode3_key = h("ul", [
  h("li", { key: "E" }, "E"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);
// 点击按钮时，把vnode1_key变为vnode3_key
// btn.onclick = () => {
//   patch(vnode1_key, vnode3_key);
//   // 原来abcd的节点没变，在头部新增了e节点，验证方法：控制台更新abcd的值，然后点击按钮更新dom，abcd的值不变
// };


// 创建虚拟节点4
const vnode4_key = h("ul", [
  h("li", { key: "B" }, "B"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
]);
// 点击按钮时，把vnode1_key变为vnode4
btn.onclick = () => {
  patch(vnode1_key, vnode4_key);
  // 原来abcd的节点没变，只是换了位置，验证方法：控制台更新abcd的值，然后点击按钮更新dom，abcd的值不变，位置改变
};


/** 总结：
 * 1. 最小量更新太厉害啦！真的是最小量更新！当然，key很重要。key是这个节点唯一标识，告诉diff算法，在更改前后他们是同一个dom节点。
 * 2. 只有是同一个虚拟节点，才进行精细化比较，否则就是暴力删除旧的，插入新的。
 * 延伸问题：如何定义是同一个虚拟节点？
 * 答：选择器相同且key相同。
 * 3. 只进行同层比较，不会进行跨层比较。即使是同一片虚拟节点，但是跨层了，对不起，精细化比较不diff你。而是暴力删除旧的，然后插入新的。
 * diff并不是那么的“无微不至”啊！真的影响效率嘛？
 * 答案：上面的操作在实际vue开发中，基本不会遇见，所以这是合理的优化机制。
*/