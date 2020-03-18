## 手动搭建express开发环境

##### 新建文件夹movie-api,并进入文件夹中
` $ cd movie-api `

##### 初始化一个npm项目，建立一个package.json文件
` $ npm init `

> 如果使用命令方式创建，则该命令要求输入几个参数：项目名称，版本号，作者登相关信息。其中的entry point选项需要注意，这里使用了默认的index.js作为main，可以将其改为开发者所期待的入口文件（比如app.js）

##### 安装Express.js并将其存入package.json文件中
` $npm install express --save `
> 如果只是临时安装Express，不想将它添加到依赖列表中，只需要省略--save参数即可，如果是全局安装，需要使用-g参数。

##### 编写index.js文件，测试Express是否安装成功
> 这个index.js的名称是入口文件，如果在初始化npm项目中初始化为其他的名称，则需要新建同名的文件名称。

```
// 定义express实例
var express = require('express')
var app = express()
// 定义路由
app.get('/', function (req, res) {
  res.send('hello world')
})
// 设置启动的地址端口信息
var server = app.listen(1000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
```
> 这里，首先需要引入Express，设置默认路由'/'，在访问'/'路径之后，会返回Hello World。然后调用一个测试服务器，监控地址本机，接口为3000，并且在控制台中打印启动服务器。

##### 保存以上代码，在命令行提示符中使用如下命令运行程序：
` node index.js `

##### 在浏览器中访问http://localhost:1000/,可以打开测试页面。