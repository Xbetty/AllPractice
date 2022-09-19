// 手写h函数对应的index测试文件
import h from "./mysnabbdom/h";

const myVnode1 = h("div", {}, "文字");
console.log("myVnode1", myVnode1);

const myVnode2 = h("ul", {}, [
  h("li", {}, "苹果"),
  h("li", {}, h("span", {}, "西瓜")),
  h("li", {}, [h("div", {}, "哈哈"), h("div", {}, "嘻嘻")]),
]);
console.log("myVnode2", myVnode2);

const myVnode3 = h("div", {}, h("span", {}, "hh"));
console.log("myVnode3", myVnode3);
