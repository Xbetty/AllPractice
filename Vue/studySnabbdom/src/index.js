// 手写patch函数对应的index测试文件
import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");
const vnode1 = h("ul", {}, [
  h('li',{},'A'),
  h('li',{},'B'),
  h('li',{},'C'),
  h('li',{},[
    h('span',{},'C1'),
    h('span',{},'C2'),
  ]),
])
document.getElementById('btn').onclick=(()=>{
  patch(container, vnode1);
})
