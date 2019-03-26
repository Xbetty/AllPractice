<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <div class="top-text">
          <h1 class="title">vuexms - 管理系统</h1>
        </div>
        <el-menu :default-openeds="['1']" default-active="/" router background-color="#545c64" text-color="#fff">
          <!-- 默认首页 -->
          <el-menu-item index="/" style="background-color:#333;">
            <i class="el-icon-setting"></i>
            首页
          </el-menu-item>
          <!-- 导航一 -->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
              <el-menu-item index="userList">账号列表</el-menu-item>
              <el-menu-item index="userAdd">添加账号</el-menu-item>
              <el-menu-item index="passwordEdit">修改密码</el-menu-item>
          </el-submenu>
          <!-- 导航二 -->
          <el-menu-item index="/login">
            <i class="el-icon-setting"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧表格 -->
      <el-container>
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-container>
    </el-container>

  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Login') {
      this.$confirm('退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userInfo')
        next()
      }).catch(() => {
        next(false)
      })
    }
  }
}
</script>
<style>
  .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
  .el-aside {
    background-color: #545c64;
  }
  .el-menu {
    border-right: 0;
  }
  html, body, #app, .index {
    height: 100%;
  }
  .el-container {
    height: 100% !important;
  }
  .top-text {
    text-align: center;
    padding: 30px 0px;
    /* background-color: #333; */
  }
  .top-text .title {
    color: #fff;
    font-weight: bold;
  }
</style>
