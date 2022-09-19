// 手写patch函数对应的index测试文件
import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");
const vnode1 = h("span", {}, "你好");
document.getElementById('btn').onclick=(()=>{
  patch(container, vnode1);
})
