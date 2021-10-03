const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html模版
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取js中的css成单独文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css


// 设置node环境变量: 
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
          /** 
           * css兼容性处理: post-css --> postcss-loader postcss-preset-env
           * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
           * browserslist具体配置可去github里面找
           * "browserslist": {
              // 开发环境 --> 设置node环境变量: process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境: 默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          // 使用loader的默认配置
          // 'post-css-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            // options: {
            //   ident: 'postcss',
            //   plugins: ()=>{
            //     // postcss的插件
            //     require('postcss-preset-env')()
            //   }
            // }
          }
        ]
      }
    ]
  },
  plugins: [
    // 生成html模版
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 提取js中的css成单独文件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'
}