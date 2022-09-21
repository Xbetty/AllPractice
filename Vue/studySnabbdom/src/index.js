// 手写patch函数对应的index测试文件
import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");
const vnode = h("ul", {}, [
  h('li',{key:'A'},'A'),
  h('li',{key:'B'},'B')
])
const vnode1 = h("ul", {}, [
  h('li',{key:'B'},'B'),
  h('li',{key:'A'},'A'),
  h('li',{key:'C'},'C'),
])

// const vnode1=h('div',{},'aa')

document.getElementById('btn').onclick=(()=>{
  // patch(container, vnode1);
  patch(vnode, vnode1);
})
