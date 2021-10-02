/**
 * webpack.config.js  webpack的配置文件
 * 作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）
 * 所有构建工具都是基于nodejs平台运行的，模块化默认采用commonjs
 */

//  resolve用来拼接绝对路径的方法
const path = require('path'); // 调用node.js中的路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

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
        path: path.resolve(__dirname,'output') // 指定生成的文件目录
    },
    // loader的配置：1. 下载 2. 使用（配置loader）
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
            },
            // {
            //     // 处理图片资源 
            //     // 问题：默认处理不了html中的img图片
            //     test: /\.(jpg|png|gif)$/,
            //     // 使用一个loader
            //     // 下载url-loader file-loader（url-loader依赖file-loader）
            //     loader: 'url-loader',
            //     // 配置
            //     options: {
            //         // 图片大小小于8kb，就会被base64处理
            //         // base64的优点：减少请求数量（减轻服务器压力）；缺点：图片体积会更大（文件请求速度更慢）
            //         limit: 8 * 1024,
            //         // 问题：因为url-loader默认使用es6模块解析，而html-loader引入图片是commonjs
            //         // 解析时会出问题：[object Module]
            //         // 解决：关闭url-loader的es6模块化，使用commonjs解析
            //         esModule: false,
            //         // 给图片重命名
            //         // [hash:10]取图片的hash的前10位
            //         // [ext]取文件原来扩展名
            //         name: '[hash:10].[ext]'
            //     }
            // },
            // {
            //     test: /\.html$/,
            //     // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
            //     loader: 'html-loader'
            // },
            // // 打包其他资源（除了html/js/css资源以外的资源）
            // {
            //     // 排除css/js/html资源
            //     exclude: /\.(css|js|html|less)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[hash:10].[ext]'
            //     }
            // },
            
        ]
    },
    // plugins的配置：1. 下载 2. 引入 3. 使用 
    plugins: [
        // 详细plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制'./src/index.html'，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],
    mode: 'development', // 开发模式，没有对js等文件压缩，默认生成的是压缩文件

    // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        static: resolve(__dirname,'output'), // 运行项目的目录-构建后的目录 // 报错：options has an unknown property 'contentbase'. 解决： Use static in place of contentBase
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}