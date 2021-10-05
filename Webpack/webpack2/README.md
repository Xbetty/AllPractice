# 生产环境配置相关

1. 安装mini-css-extract-plugin插件，并将MiniCssExtractPlugin.loader取代style-loader，用来提取js中的css成单独文件。使用link标签引入css而不是生成style标签，避免闪屏。同时css体积比js体积小
2. 安装postcss-loader和postcss-preset-env插件，对css进行兼容性处理
3. 安装optimize-css-assets-webpack-plugin插件，对css进行压缩
4. 安装eslint-loader eslint eslint-config-airbnb-base  eslint-plugin-import，即采用airbnb-base库进行eslint检查，统一代码规范
5. 安装babel-loader @babel/preset-env进行js兼容性处理，将es6以上的语法转化为es5及以下语法。执行webpack报错，安装@babel/core，重新执行
6. 安装babel-loader @babel/core @babel/preset-env进行js兼容性处理

* (1. 基础js兼容性处理 --> @babel/preset-env
* 问题：只能转换基本语法，如promise不能转换
* (2. 全部js兼容性处理 --> @babel/polyfill
* 问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了～
* (3. 需要做兼容性处理的就做：按需加载，加载指定兼容性的库即可 --> core-js

7. 压缩html和js
压缩js只需把mode设置为production，生产环境内置插件压缩js
html无需做兼容性
