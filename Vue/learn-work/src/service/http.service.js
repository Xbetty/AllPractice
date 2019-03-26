import axios from 'axios'
import Promise from './promise.service'
import { Notice } from 'iview'
export default {
	init () {
		//request拦截
		axios.interceptors.request.use(function (config) {
			config.headers['Content-Type'] = 'application/json'
      		config.headers['x-requested-with'] = 'XMLHttpRequest'
      		return config
		}, function (error) {
			return Promise.reject(error)
		})

		//response拦截
		axios.interceptors.response.use(function (response) {
			let data = response.data
			if (data.success || data.code === '0000' || data.code === 0) {
				return Promise.resolve(data)
			} else {
				Notice.error({
					title: "出错了",
					desc: data.message || data.msg || '请重试~'
				})
				return Promise.reject(data)
			}
		}, function (error) {
			if (error.response) {
				return Promise.reject(error)
			}
		})
	}
}