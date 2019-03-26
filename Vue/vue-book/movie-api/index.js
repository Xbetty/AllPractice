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