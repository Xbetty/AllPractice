class Vue {
    constructor(options) {
        this.$data = options.data
        console.log('options',options,this.$data)
        // 调用数据劫持的方法
        Observe(this.$data)
    }
}

// 定义一个数据劫持的方法
function Observe(obj){
    console.log('obj',obj)
    // 这是递归的终止条件
    if(!obj || typeof obj!=='object') return 

    // 通过Object.keys(obj)获取到当前obj上的每个属性
    Object.keys(obj).forEach(key=>{
        // 当前被循环的key所对应的属性值
        let value =  obj[key]

        // 把value这个子节点，进行递归
        Observe(value)

        // 需要为当前的key所对应的属性，添加getter和setter
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get(){
                console.log(`有人获取了${key}的值`)
                return value
            },
            set(newValue){
                value = newValue 
                Observe(value)
            }
        })
    })
}