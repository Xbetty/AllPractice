import Watcher from './Watcher'
const REG = /\{\{(.*)\}\}/
class Complier {
	constructor(el, vm) {
    this.el = document.querySelector(el)
    console.log('this.el', this.el) // <div id="app"></div>
    this.vm = vm
    console.log('this.vm', this.vm) // vue
    this.frag = this._createFragment()
    console.log('this.frag', this.frag) // #document-fragment
		this.el.appendChild(this.frag)
	}
	_createFragment(){
    // createDocumentFragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。
    // 当你向提取文档的一部分，改变，添加或删除某些内容及插入到文档末尾可以使用createDocumentFragment()方法
    // 你也可以使用文档的文档对象来执行这些变化，但要防止文件结构被破坏，createDocumentFragment()方法可以更安全改变文档的结构及节点
    var frag = document.createDocumentFragment()
    console.log('frag0', frag)
		var child
		while(child = this.el.firstChild) {
			this._complie(child)
			frag.appendChild(child)
    }
    console.log('frag1', frag)
		return frag
	}
	_complie(node) {
		if(node.nodeType === 1) {
      var attr = node.attributes
      var self = this 
      if(attr.hasOwnProperty('v-model')){
        var name = attr['v-model'].nodeValue
        node.addEventListener('input', function(e){
          self.vm[name] = e.target.value
        })
        node.value = this.vm[name]
      }
		}
		if(node.nodeType === 3) {
			if(REG.test(node.nodeValue)){
				var name = RegExp.$1
        name = name.trim()
				new Watcher(node, name, this.vm)
			}
		}
	}
}
export default Complier