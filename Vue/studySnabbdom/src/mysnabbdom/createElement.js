// 真正创建节点。将vnode创建为DOM，是孤儿节点，不进行插入
export default function createElement(vnode, pivot) {
  console.log("目的是把虚拟节点", vnode, "真正变成dom");
  // 创建一个DOM节点，这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode.sel);
  console.log("domNode", domNode);
  // 有子节点还是有文本？
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 它内部是文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 它内部是子节点，就要递归创建节点
    for (let i = 0; i < vnode.children.length; i++) {
      // 得到当前这个children
      let child = vnode.children[i];
      // 创建出它的DOM，一旦调用createElement意味着：创建出DOM了，并且它的ele属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点。
      let childDom = createElement(child)
      // 上树
      domNode.appendChild(childDom);
    }
  }
  // 补充elm属性
  vnode.elm = domNode;
  // 返回elm，elm属性是一个纯dom对象
  return vnode.elm;
}
