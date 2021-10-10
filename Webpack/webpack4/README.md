# 生产环境优化配置相关

1. oneOf 优化生产环境打包构建速度，避免进行多次loader判断

2. 缓存
babel缓存（让第二次打包构建速度更快）
设置babelDirectory:true
文件资源缓存（contenthash：上线代码的性能优化，让代码上线运行缓存更好使用）
hash：每次webpack构建时会生成一个唯一的hash值
问题：因为js和css同时使用一个hash值，如果重新打包会导致所有缓存失效。（可能我只改动一个js文件 但是css文件
会变成一个新的文件）
chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样。
问题：js和css的hash值还是一样的。（因为css是从js中被引入的，所以同属于一个chunk）
contenthash： 根据文件的内容生成hash值。不同文件hash值一定不一样。

3. tree shaking：去除无用代码
前提条件：1. 必须使用ES6模块化 2. 开启production环境
作用：去除无用代码， 减少体积代码

在package.json中配置：
"sideEffects": false  所有代码都没有副作用（都可以进行tree shaking）
问题：可能会把css/@bable/polyfill（副作用）文件干掉
"sideEffects": ["*.css", "*.less"] (css文件和less文件不会被tree shaking)

4. 懒加载和预加载（待补充）

5. PWA：
workbox  --> workbox-webpack-plugin