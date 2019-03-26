var express = require('express');
var router = express.Router();
 // 引入连接数据库模块
 const connection = require('./conn')
 // 连接数据
 connection.connect(() => {
   console.log('连接数据库成功')
 })
// 接收登录请求
router.post('/checkLogin', (req, res) => {
  // 接收用户名和密码
  let {username, password} = req.body
  console.log(username, password)
  // 查询用户名和密码是否存在
  const sqlStr = `select * from users where username='${username}' and password='${password}';`
  connection.query(sqlStr, (err, data) => {
    console.log('data', data)
    if(err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
// 接收获取用户列表的请求
router.get('/getUserList', (req, res) => {
  // 查询数据库 把当前所有用户数据返回给前端
  const sqlStr = `select * from users`
  connection.query(sqlStr, (err, data) => {
    console.log('server-index.js数据列表:', data)
    if(err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
module.exports = router;
