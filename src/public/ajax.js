import axios from 'axios'
import { message } from 'antd'

const Ajax = axios.create({
	baseURL: '',
	timeout: 30000,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	// withCredentials: true,
})

module.exports = {
	get(url, sus, err) {
		Ajax.get(url).then(res => {
			var { data } = res,
				{ meta } = data
			if (meta.errno !== 0) {
				if (err) return err(res)
				return message.error('请求失败!')
			}
			sus && sus(data.result)
		})
		.catch(er => {
			message.error(er.message)
		})
	},
	post(url, data, sus, err) {
		var params = new URLSearchParams(message)

		Ajax.post(url, params).then(res => {
			var { data } = res,
				{ meta } = data
			if (meta.errno !== 0) {
				if (err) return err(res)
				return message.error('请求失败!')
			}
			sus && sus(d.result)
		})
		.catch(er => {
			message.error(er.message)
		})
	}
}
