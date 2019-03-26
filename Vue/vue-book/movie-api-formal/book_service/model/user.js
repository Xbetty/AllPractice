var mongoose = require('./../common/db')
// -----建立了相关的user数据集，其中包含了7个字段，每个字段赋予了相应的数据类型-----
// 用户数据集
var user = new mongoose.Schema({
  username: String,
  password: String,
  userMail: String,
  userPhone: String,
  userAdmin: Boolean,
  userPower: Number,
  userStop: Boolean
})

// -----定义常用的搜索方法，用于搜索和显示相关的数据内容------

// 用户的查找方法
user.static.findAll = function (callBack) {
  this.find({},callBack);
};
// 使用用户名查找的方式
user.static.findByUsername = function (name, callBack) {
  this.find({username:name}, callBack);
};
// 登录匹配是不是拥有相同的用户名和密码并且没有处于封停状态
user.static.findUserLogin = function (name, password, callBack) {
  this.find({username:name, password:password, userStop:false}, callBack);
};
// 验证邮箱，电话和用户名找到用户
user.static.findUserPassword = function(name, mail, phone, callBack) {
  this.find({username:name, userMail:mail, userPhone:phone}, callBack);
};

var userModel = mongoose.model('user', user)
module.exports = userModel