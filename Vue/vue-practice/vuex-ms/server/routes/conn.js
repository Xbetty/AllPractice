// 引入mysql
const mysql = require('mysql');
// 创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'vuexms'
});
// 暴露出去
module.exports = connection
