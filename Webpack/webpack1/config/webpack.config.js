/**
 * webpack.config.js  webpack的配置文件
 * 作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）
 * 所有构建工具都是基于nodejs平台运行的，模块化默认采用commonjs
 */

//  resolve用来拼接绝对路径的方法
const path = require('path'); // 调用node.js中的路径

// webpack配置
module.exports = {
    // 入口起点
    entry: {
        index: './src/js/index.js' // 需要打包的文件
    },
    // 输出
    output: {
        // 输出文件名
        filename: '[name].js', // 输入的文件名是什么，生成的文件名也是什么
        // 输出的路径 （绝对路径，避免出错）
        // __dirname nodejs的变量，代表当前文件的目录的绝对路径
        path: path.resolve(__dirname,'../output') // 指定生成的文件目录
    },
    // loader的配置
    module: {
        rules: [
            // 详细的loader配置
            // 不同文件必须配置不同loader进行处理
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader进行处理
                use: [
                    // use数组中loader执行顺序：从右到左，或者说从下到上，依次执行
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 匹配less文件
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件，需要下载less-loader和less
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置
    plugins: [
        // 详细plugins的配置
    ],
    mode: 'development' // 开发模式，没有对js等文件压缩，默认生成的是压缩文件
}