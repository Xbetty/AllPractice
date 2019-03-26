var express = require('express');
// 路由引入
var router = express.Router();
// 中间件引入
var mongoose = require('mongoose')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 定义路由
router.get('/mongooseTest', function(req, res, next) {
  // 调用Mongoose中间件中的connect()方法，其中两个相关参数说明如下：
  // 第一个参数是数据库的url地址，即启动的MongoDB的IP地址和访问的数据库；
  // 第二个参数是一个JavaScript的对象串，用于传递相关的配置。
  mongoose.connect('mongodb://localhost/pets', { userMongoClient: true })
  mongoose.Promise = global.Promise

  // 通过实例化Cat的数据集，调用Mongoose中的model()方法，传入名称和结构来创建一个数据集。 
  var Cat = mongoose.model('Cat', { name:String })

  // 对于Cat数据集中创建的新对象，向其中传入一个name属性，内容为Tom，通过Mongoose中创建的模型（model）自带的save（）方法来保存内容。
  var tom = new Cat({ name: 'Tom' })
  tom.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
  res.send('数据库连接测试')
})

module.exports = router;
