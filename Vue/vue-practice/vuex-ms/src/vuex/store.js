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
