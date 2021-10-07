const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html模版
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取js中的css成单独文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css

// 设置node环境变量:
process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * js兼容性处理： babel-loader @babel/core @babel/preset-env
       * 1. 基础js兼容性处理 --> @babel/preset-env
       * 问题：只能转换基本语法，如promise不能转换
       * 2. 全部js兼容性处理 --> @babel/polyfill
       * 问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了～
       * 3. 需要做兼容性处理的就做：按需加载，加载指定兼容性的库即可 --> core-js
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
              // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },

      },
      /**
       * 正常来讲，一个文件只能被一个loader处理
       * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：先执行eslint，再执行babel
      */
      /**
       * 语法检查：eslint-loader eslint
       * 注意：只检查自己写的源代码，第三方的库是不用检查的
       * 设置检查规则：package.json中eslintConfig中配置～
       * "eslintConfig": {
          "extends": "airbnb-base"
        }
       * airbnb规则（github） --> eslint-config-airbnb-base  eslint-plugin-import  eslint
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
      // 样式处理
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
          },
        ],
      },
    ],
  },
  plugins: [
    // 生成html模版
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // 提取js中的css成单独文件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 生产环境下会自动压缩代码。
  mode: 'production',
};
