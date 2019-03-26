import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home.vue'
import InfoManage from '@/page/infos/infoManage.vue'
import aTest from '@/page/test/aTest.vue'
import bTest from '@/page/test/bTest.vue'
import cTest from '@/page/test/cTest.vue'
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
	      	redirect: '/home'
		},
	    {
	        path: '/home',
	        name: 'Home',
	        component: Home,
	        children: [{
	        	path: '/infoManage',
		        name: 'infoManage',
		        component: InfoManage
	        },{
	        	path: '/atest',
		        name: 'atest',
		        component: aTest
	        },{
	        	path: '/btest',
		        name: 'btest',
		        component: bTest
	        },{
	        	path: '/ctest',
		        name: 'ctest',
		        component: cTest
	        }]
	    }
	]
})
