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
