## 利用Express生成器搭建后台项目

#### 通过命令安装应用生成器
` $ npm install express-generator -g `

#### 利用express创建项目
` $ express book_service `

#### 使用cd命令进入刚创建好的工程中，此时创建的工程文件中并没有使用npm安装相关的包，所以应该使用如下命令进行安装：
` $ cd express book_service `

` $ npm install `

#### 启动服务

` set DEBUG= book_service & npm start `
或者
` npm start `

#### 关于目录
* bin文件夹中www.js包含着对启动项目的一些测试服务器的配置，包括启动服务器的端口监听及bug控制台输出等。
* node_modules文件夹中是npm安装的依赖包和相关的资源
* public文件夹下是本系统相关的静态资源
* routes文件夹下即为项目的全部代码和路由内容
* views文件夹下的.jade文件为routes文件夹下的逻辑代码调用的相关模板文件，但是在这里，因为Express只是提供相关的API接口，前台使用Vue.js进行显示，而不是用Express的前台模板进行输出。

## Mongoose

> 使用MongoDB作为数据库的话，首先需要一个中间件作为连接方式，Javascript中提供了多个npm包作为中间连接的中间件。

#### 安装mongoose中间件
` npm install mongoose --save `

#### 安装完成后，新建一个路由作为测试路由

> 更新index.js中的代码，新增一个名为mongooseTest的路由，用于测试MongoDB是否正常启动并能正确使用。为了测试，创建一个名为Cat的数据集，其中包含了一个name数据属性，值为String（字符串）；连接一个叫做pets的库，并在Cat中新增一个新的数据，其name属性为Tom类型。代码如下：

```
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
```

#### 保存代码，在命令行中重启服务器，通过浏览器访问http://localhost:3000/mongooseTest地址。

> #### 使用supervisor监控代码的修改
> 在开发系统中，如果要修改代码，则需要使用Ctrl+C组合键来结束服务，然后使用相关的命名重启系统，这无疑是很繁琐的，其实可以使用Supervisor或Nodemon等中间件作为插件启动。<br/>

> ##### 全局安装supervisor
` npm install -g supervisor `
> ##### 启动程序
` supervisor bin/www  `

> 安装成功后需要上述命令启动程序，启动后如果工程中的代码修改过，则会自动重新载入代码。 

## 用户系统开发

#### 建立相关路由文件
> 建立user.js路由文件，将所有的用户系统开发放在此文件中。对于routes目录中的文件以文件名作为域名二级路径，即使用http://localhost:3000/users访问可以直接导航到users.js文件中。


> 这是因为在app.js中引用了users.js文件并对其增加了一个新的路由设置，具体代码如下：
```
var usersRouter = require('./routes/users');
// 使用引入的文件
app.use('/users', usersRouter);
```
> ##### 即要建立新的路由代码文件，均需要在app.js代码中引用该文件，并定义新的路由地址才可以使用。

#### 建立数据库连接
> 需要写一个用于连接数据库的公用模块，此代码放置在根目录的common文件夹中，新建文件db.js
```
var mongoose = require('mongoose')
var url = 'mongodb://localhost/movieServer'
mongoose.connect(url)
// 连接数据库
module.exports = mongoose
```

#### 建立model
> 需要新建一个存放各种model的文件夹models

> 因为所有用户的操作都应该在用户这个数据集的基础上，所以需要在models文件夹下新建user.js作为数据集，其中代码如下：

```
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

```