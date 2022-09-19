import vnode from "./vnode";
// vnode(sel, data, children, text, elm)
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel === "" || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  // 判断oldVnode和newVnode是不是同一个节点)
  if (
    oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel
  ) {
    console.log("是同一个节点");
  } else {
    console.log("不是同一个节点，暴力插入新的，删除旧的");
    createElement(newVnode, oldVnode.elm);
  }
}
