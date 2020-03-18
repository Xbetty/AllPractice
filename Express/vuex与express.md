# 一、前台
## 1. 搭建环境并配置文件
### （1）搭建vue-cli项目
` vue init webpack vuex-ms `

### （2）安装依赖
` npm install `
或者
` cnpm i `

### （3）启动项目
` npm run dev `
### （4）引入element-ui

> #### 安装element-ui
` cnpm i element-ui --save `
或者
` npm i element-ui -S `

> #### 在main.js中引入并注册element-ui
```
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册element-ui
Vue.use(ElementUI)
```
### （5）引入axios
> #### 安装axios
` npm install axios --save `

> #### 在main.js中引入axios并挂载在全局
```
// 引入axios
import axios from 'axios'
// 挂载在Vue的原型上
Vue.prototype.axios = axios
```

### （6）安装引入vuex
> #### 安装vuex
` cnpm i vuex --save `

> #### main.js全局引入挂载store

```
import store from './vuex/store'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```
### （7）总结
> #### main.js
```
import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
// 引入路由
import router from './router'
import store from './vuex/store'
// 引入axios
import axios from 'axios'

// 挂在到vue的原型上
Vue.prototype.axios = axios

// 注册elementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```
> #### reset.css
##### index.html文件中引入reset.css文件
```
    <link href="./static/css/reset.css" rel="stylesheet"/>
```
##### reset.css内容
```
@charset "utf-8";
/* 防止用户自定义背景颜色对网页的影响，添加让用户可以自定义字体 */
html{
    color: #000;
    background: #fff;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-size: 100%;
}
/* IE6对positon:fixed的单独处理修正IE6滚动抖动的bug */
*html,*html body{
    background-image:url(about:blank);/*修正IE6滚动抖动的bug*/
    background-attachment: fixed;/*根据自己实际，非必需*/
}
/* 内外边距通常让各个浏览器样式的表现位置不同 */
body,div,dl,dt,dd,ul,li,pre,form,fieldset,select,input,textarea,button,p,blockquote,th,td,img,iframe{
    margin: 0;
    padding: 0;
}
body{
    width: 100%;
}
/* 要注意表单元素并不继承父级 font 的问题 */
body,button,input,select,textarea{
    font: 12px/1.5 "微软雅黑","Microsoft YaHei","\5b8b\4f53","Tahoma","Arial";
    color: #333;
    outline: none;
}
input,select,textarea{
    font-size: 100%;
}
/* 重置button边框 */
button{
    border: none;
}
/* 去掉各Table cell 的边距并让其边重合 */
table{
    border-collapse: collapse;
    border-spacing: 0;
}
/* IE bug fixed: th 不继承 text-align*/
th{
    text-align: inherit;
}
/* 对齐是排版最重要的因素, 别让什么都居中 */
caption,th{
    text-align: left;
}
/* 去除默认边框 */
fieldset,img{
    border: none;
    outline: none;
    -moz-outline:none;
}
/* ie6 7 8(q) bug 显示为行内表现 */
iframe{
    display: block;
}
/* 去掉列表前的标识, li 会继承 */
ol,ul,li{
    list-style: none;
}
/* 来自yahoo, 让标题都自定义, 适应多个系统应用 */
h1,h2,h3,h4,h5,h6{
    font-size: 100%;
    font-weight: 500;
    margin: 0;
    padding: 0;
}
/* 让链接默认不显示下划线，在hover状态下显示下划线 */
a{
    color: #333;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    blr:expression(this.onFocus=this.blur());
}
a:hover{
    text-decoration: underline;
}
/* 清理浮动 */
.clearfix:before,.clearfix:after{
    display: block;
    content: " ";
    clear: both;
}
.clearfix{
    zoom: 1; /* for ie67*/
}
/* 重设 HTML5 标签, IE 需要在 js 中 createElement(TAG) */
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
    display: block;
}
/* HTML5 媒体文件跟 img 保持一致 */
audio,canvas,video{
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
address,caption,cite,code,dfn,em,th{
    font-style: normal;
    font-weight: normal;
}
/*解决盒模型问题css3属性也可用来统一FORM元素风格*/
.box-sizing{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}

```
## 2. 组件的生成

#### （1）登录组件 login.vue

##### 登录组件页面设置100%高度
> 注意：不要设置style为scoped，否则无效果。
```
html, body, #app, .login {
  height: 100%;
}
```

##### 设置表单水平垂直居中
```
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
##### login.vue内容
```
<template>
  <div class="login">
    <!-- 登陆表单 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <h1 class="title"><i class="el-icon-menu"></i>登录页面</h1>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        username: '',
        password: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }, // 非空
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' } // 长度
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 保留this
          let _this = this
          // 收集用户名和密码发送给服务端
          this.axios.post('/api/checkLogin', {
            username: _this.loginForm.username,
            password: _this.loginForm.password
          })
            .then(response => {
              if (response.data.length) {
                console.log('response：', response.data[0])
                // 把用户信息存入到本地存储
                // 实现从对象转换为JSON字符串，使用JSON.stringify()方法：
                // var json = JSON.stringify({a: 'Hello', b: 'World'}); //结果是 '{"a": "Hello", "b": "World"}'
                // localStorage.setItem('userinfo', JSON.stringify(response.data[0]))
                // // 要实现从JSON转换为对象，使用JSON.parse()方法：
                // // var obj = JSON.parse('{"a": "Hello", "b": "World"}'); //结果是 {a: 'Hello', b: 'World'}
                // let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                // 把登录用户信息存入state
                _this.$store.commit('SAVE_USERINFO', response.data[0])
                _this.$message({
                  message: '登录成功',
                  type: 'success'
                })

                // 跳转到后台首页
                _this.$router.push('/')
              } else {
                _this.$message({
                  message: '登录失败',
                  type: 'error'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
}
html, body, #app, .login {
  height: 100%;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0px 45px 10px 10px;
}
.el-form .title {
  font-size: 22px;
  color:#333;
  font-weight: bold;
  padding: 20px 0 20px 60px;
}
</style>

```

### （2）用户列表组件 userList.vue
##### userList.vue内容
```
<template>
  <div class="home">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>欢迎你，{{ this.$store.state.userInfo.username }}</span>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户账号列表</span>
          <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
        </div>
        <!--  表格 -->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="password" label="密码" width="180"></el-table-column>
          <el-table-column prop="realname" label="真实姓名" min-width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </div>
</template>
<script>
// 引入辅助函数
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.$store.dispatch('GET_USERLIST').then(() => {
      // 把全局的userList赋值给tableDate
      // this.tableData = this.$store.state.userList // 第一种方式
      // this.tableData = this.userList  // 第一种方式
      //  数据筛选
      // this.newUserList = this.$store.state.userList.filter(v => v.username === 'admin')
      // this.tableData = this.newUserList
    })
    // this.GET_USERLIST().then(() => {  // 第二种方式
    //   this.tableData = this.userList
    // })
    this.getUserList().then(() => {
      // this.tableData = this.userList // 第三种方式
      // 获取全局的getters---------getter处理数据筛选方式一
      // console.log(111, this.$store.getters.userList)
      // this.tableData = this.$store.getters.filterUsers
      // 使用辅助函数，获取全局的getters
      console.log(222, this.filterUsers)
      this.tableData = this.filterUsers
    })
  },
  methods: {
    // ...mapActions(['GET_USERLIST']), // 第二种方式
    ...mapActions({
      getUserList: 'GET_USERLIST' // 第三种方式
    }),
    handleEdit (id) {
      console.log('修改id', id)
    },
    handleDelete (id) {
      console.log('删除id', id)
    }
  },
  computed: {
    ...mapGetters(['filterUsers']),
    ...mapState({
      userList: state => state.userList // 第一种方式
    })
  }
}
</script>
<style>
.home {
  width: 100%;
}
.header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

```

## 3. 路由的配置

#### 在router下面的index.js文件中注册路由
```
import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login'
// import Index from '@/components/Index'

// 异步组件加载
const Login = () => import('@/components/login')
const Index = () => import('@/components/Index')
const UserList = () => import('@/components/userList')
const UserAdd = () => import('@/components/userAdd')
const PasswordEdit = () => import('@/components/passwordEdit')
const Home = () => import('@/components/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/userList',
          name: 'userList',
          component: UserList
        },
        {
          path: '/userAdd',
          name: 'userAdd',
          component: UserAdd
        },
        {
          path: '/passwordEdit',
          name: 'passwordEdit',
          component: PasswordEdit
        }
      ]
    }
  ]
})

```

## 4. 跨域问题

#### 跨域问题解决方案
修改前端config目录下的index.js文件:
<br/>
[proxytable解决方案](https://www.cnblogs.com/tugenhua0707/p/8052051.html)
> 【参考版】
```
proxyTable: {
  '/api': {
    target: 'http://xxxxxx.com', // 接口的域名
    // secure: false,  // 如果是https接口，需要配置这个参数
    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    pathRewrite: {
      '^/api': ''
    }
  }
}
```
> 【此项目版】
```
proxyTable: {
  '/api': {
    target: 'http://localhost:888/',  //目标接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api': ''   //重写接口
    }
  }
}
```
### 5. Vuex
> #### （1）在src文件夹下创建vuex文件夹，并新建store.js文件。

```
// 引入vue
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// 注册Vuex
Vue.use(Vuex)

// 状态
const state = {
  userInfo: JSON.parse(localStorage.getItem('userinfo')),
  userList: []
}

// mutations 主要用来操作state
const mutations = {
  // 保存用户数据
  SAVE_USERINFO (state, userinfo) {
    // 先把数据存入本地存储
    localStorage.setItem('userinfo', JSON.stringify(userinfo))
    // 再更新数据
    state.userInfo = userinfo
  },
  // 获取全局的用户数据
  GET_USERLIST (state, userlist) {
    state.userList = userlist
  }
}

// 定义action,异步的,主要是commit mutations, 由mutations来改变状态
const actions = {
  GET_USERLIST ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/getUserList').then(res => {
        console.log('store.js获取所有用户数据:', res.data)
        commit('GET_USERLIST', res.data)
        resolve()
      })
    })
  }
}

// 定义全局共享属性getters
const getters = {
  filterUsers: state => state.userList.filter(v => v.username === 'admin')
}

// 创建store仓库暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

```
> #### vuex的使用
> ##### （1）通过mutations的commit提交改变，如login.vue中:
`  _this.$store.commit('SAVE_USERINFO', response.data[0]) `<br/>

commit 接收两个参数， mutations中对应的函数名和改变的值。
> ##### （2）通过actions改变mutaions，间接改变state，如userList.vue中，通过vuex异步获取用户列表:
 * 方式一
 ```
 // 引入辅助函数
 import {mapState, mapActions, mapGetters} from 'vuex'
 ```

 ```
created () {
    this.$store.dispatch('GET_USERLIST').then(() => {
     // 把全局的userList赋值给tableDate
      // this.tableData = this.$store.state.userList // 第一种方式
     this.tableData = this.userList  // 第一种方式
    })
}
 ```

```
computed: {
    ...mapState({
      userList: state => state.userList
    })
  }
```

> * 方式二
 ```
 // 引入辅助函数
 import {mapState, mapActions, mapGetters} from 'vuex'
 ```
 ```
methods: {
    ...mapActions(['GET_USERLIST']), // 第二种方式
}
 ```
  ```
created () {
    this.GET_USERLIST().then(() => {
      this.tableData = this.userList
    })
}
 ```
 ```
computed: {
    ...mapState({
      userList: state => state.userList
    })
  }
```
 
> * 方式三
 ```
 // 引入辅助函数
 import {mapState, mapActions, mapGetters} from 'vuex'
 ```
 
 ```
methods: {
    ...mapActions({
      getUserList: 'GET_USERLIST' // 第三种方式
    })
}
 ```
 
 ```
 created () {
    this.getUserList().then(() => {
      this.tableData = this.userList // 第三种方式
    })
  }
 ```
 ```
computed: {
    ...mapState({
      userList: state => state.userList
    })
  }
```
> ##### （3）通过getters过滤数据
> * 方式一
 ```
 // 引入辅助函数
 import {mapState, mapActions, mapGetters} from 'vuex'
 ```
 
 ```
 created () {
    this.getUserList().then(() => {
      // 获取全局的getters---------getter处理数据筛选方式一
      this.tableData = this.$store.getters.filterUsers
    })
  }
 ```
  
 ```
methods: {
    ...mapActions({
      getUserList: 'GET_USERLIST'
    })
}
 ```
 > * 方式二
 ```
 // 引入辅助函数
 import {mapState, mapActions, mapGetters} from 'vuex'
 ```
 
  ```
 created () {
    this.getUserList().then(() => {
      // 使用辅助函数，获取全局的getters---------getter处理数据筛选方式二
      this.tableData = this.filterUsers
    })
  }
 ```
 
  ```
methods: {
    ...mapActions({
      getUserList: 'GET_USERLIST'
    })
}
 ```
 
 ```
 computed: {
    ...mapGetters(['filterUsers'])
  }
 ```
 
 
### 6. vue异步组件加载
```
// 引入组件
// import Login from '@/components/login'
// import Index from '@/components/index'

// 异步加载
const Login = () => import('@/components/login')
const Index = () => import('@/components/index')
```


# 2、后台
> #### 【官方版】 安装express 
首先假定你已经安装了Node.js，接下来应该为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。
```
$ mkdir myapp
$ cd myapp
```
通过npm init命令为你的应用创建一个package.json文件。
` $ npm init `
此命令将要求你输入几个参数，例如此应用的名称和版本。你可以直接按回车键接受大部分默认设置即可，下面这个除外：
entry point:(index.js)
键入app.js或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的index.js文件名，只需要按回车键即可。
接下来在myapp目录下安装Express并将其保存到依赖列表中。如下：
` $ npm install express --save `
如果只是临时安装Express，不想将它添加到依赖列表中，可执行如下命令：
` $ npm install express --no-save `

 #### 1. 【此项目版】安装express
在当前项目目录下安装expres：
<br/>
` $ express server -e `
<br/>
进入后台server目录下，安装相关依赖：
<br/>
```
$ cd server
$ cnpm i
```
在app.js文件中监听端口888：
```
// 监听窗口
app.listen(888, () => {
  console.log('服务器开始启动...')
})
```
启动服务器：
<br/>
` $ nodemon app `或者 ` $ node app.js `
<br/>
在后台的routes - index.js文件中创建登录路由：
```
/* 接收登录请求 */
router.post('/checkLogin', (req, res) => {
  res.send('1')
});
```

 #### 2. 启动MySql

1. 启动mysql数据库：在出来的DOS命令窗口中输入net start mysql。（附：关闭的命令为net stop mysql）
2. 在DOS命令窗口输入**mysql -hlocalhost -uroot -p**回车进入mysql数据库，其中-h表示服务器名，localhost表示本地，-u为数据库用户名，root是mysql默认用户名；-p为密码，如果设置了密码，可直接在-p后链接输入（附：本机mysql的用户名为root，密码为123456）。如果你的mysql没有装在c盘下，你需要先使用DOS命令进入mysql的安装目录下的bin目录中。
3. 输入show databases;显示你有的数据库（mysql数据库中的命令必须以分号结尾）。
4. 如果要退出mysql数据库，输入exit;回车。

##### 安装配置mysql(在server文件夹下进行安装)
` cnpm install mysql --save `
##### node.js连接mysql，在routes文件夹下新建conn.js文件
```
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
module.exports= connection;
```
##### 在routes文件夹下的index.js文件中引入conn.js
```
// 引入连接数据库模块
const connection = require('./conn');
// 连接数据库
connection.connect(() => {
  console.log('数据库连接成功')
})
```

##### index.js文件内容
```
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


```







