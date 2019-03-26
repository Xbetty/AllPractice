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
        <!--1. 从state中获取用户名 -->
        <!-- <span>欢迎你，{{$store.state.userInfo.username}}</span> -->
        <!--2. 从计算属性中获取用户名  -->
        <span>欢迎你，{{username}}</span>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            用户名：{{username}}
          </div>
          <div class="text item">
            密&nbsp;&nbsp;&nbsp;码： {{password}}
          </div>
          <div class="text item">
            真实姓名： {{realname}}
          </div>
        </el-card>
      </el-main>
  </div>
</template>
<script>
// 引入mapState
import {mapState} from 'vuex'
export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: '',
        realname: ''
      }
    }
  },
  computed: {
    // username () {
    //   return this.$store.state.userInfo.username
    // },
    // password () {
    //   return this.$store.state.userInfo.password
    // },
    // realname () {
    //   return this.$store.state.userInfo.realname
    // },
    // 辅助函数获取state数据
    ...mapState({
      // userInfo: state => state.userInfo,
      username: state => state.userInfo.username,
      password: state => state.userInfo.password,
      realname: state => state.userInfo.realname
    })
  }
}
</script>
<style>
.home {
  width: 100%;
}
.header {
  background-color: #B3C0D1;
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
    clear: both
  }
</style>
