import createElement from "./createElement";
export default function patchVnode(newVnode, oldVnode) {
  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return;
  // 判断新vnode有没有text属性
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    // 新vnode有text属性
    console.log("新vnode有text属性");
    if (newVnode.text !== oldVnode.text) {
      // 如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即可。如果老的elm中是children，那么也会立即消失掉
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性，即有children节点
    console.log("新vnode没有text属性");
    // 判断老的有没有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 老的有children，此时就是最复杂的情况， 就是新老都有children
      // 所有未处理的节点的开头
      let un = 0;
      for (let i = 0; i < newVnode.children.length; i++) {
        let newChild = newVnode.children[i];
        // 再次遍历，看看oldVnode中有没有节点和它是相同的
        let isExist = false;
        for (let j = 0; j < oldVnode.children.length; j++) {
          let oldChild = oldVnode.children[j];
          if (oldChild.sel === newChild.sel && oldChild.key === newChild.key) {
            isExist = true;
            console.log(1);
          } else {
            console.log(2);
          }
        }
        if (!isExist) {
          console.log(newVnode, oldVnode, i);
          let dom = createElement(newChild);
          newChild.elm = dom;
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
          } else {
            oldVnode.elm.appendChild(dom);
          }
        } else {
          // 让处理的节点指针下移动
          un++;
        }
      }
    } else {
      // 老的没有children，新的有children
      // 清空老的节点的内容
      oldVnode.elm.innerText = "";
      // 遍历新的vnode的子节点，创建dom，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
