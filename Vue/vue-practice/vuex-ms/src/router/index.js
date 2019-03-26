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
