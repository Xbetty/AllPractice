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
      // 使用辅助函数，获取全局的getters---------getter处理数据筛选方式二
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
