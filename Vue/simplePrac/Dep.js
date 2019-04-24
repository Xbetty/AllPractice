class Dep {
	// static target = null
	constructor() {
		this.list = []
	}
	listen(subs) {
    console.log('subs', subs)
		this.list.push(subs)
	}
	notify() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].update()
		}
	}
}
Dep.prototype.target = null
export default Dep