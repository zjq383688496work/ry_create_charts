/* window 扩展方法 */
const extend = require('util')._extend
const cData  = require('@state/chartsData/default')

if (!window.charts) window.charts = {}

module.exports = extend(window.charts, {
	// 递归处理数据
	dataFormat(obj) {
		Object.keys(obj).map(_ => {
			let n = obj[_]
			let { type, value } = n

			if (type === 'object') {
				if (value === undefined) {
					obj[_] = cData[type].default
				} else {
					obj[_] = charts.dataFormat(value)
				}
				return
			}
			if (value === undefined) {
				obj[_] = cData[type].default
			} else {
				obj[_] = value
			}
			if (type === 'color') {
				let { color, alpha } = value
				var rgba = [ ...color.colorRGB(), alpha || 100 ]
				obj[_] = `rgba(${rgba.join(',')})`
			}
			if (obj[_] === 'null') {
				delete obj[_]
			}
		})
		return obj
	},
	dataBind(obj, cache, api) {
		const { bind, data } = obj
		const { value } = api
		let ca
		if (!bind || !data) return obj
		const key = bind.value
		if (value === 'custom') {
			
		} else {
			ca = cache[`g_${value}`]
		}
		if (!key || !(ca && ca.data)) return obj
		data.value = ca.data.map((_, i) => {
			return _[key]
		})
		delete obj.bind
		return obj
	},
	// 图表配置项格式化
	chartsFormat(opts, cache) {
		// console.clear()
		opts = deepCopy(opts)
		const { data, options } = opts
		const { api, series, xAxis, yAxis } = data

		let mod = this.dataFormat(options)
		mod.series = series.map((_) => this.dataFormat(this.dataBind(_, cache, api)))
		xAxis && (mod.xAxis = xAxis.map((_) => this.dataFormat(this.dataBind(_, cache, api))))
		yAxis && (mod.yAxis = yAxis.map((_) => this.dataFormat(this.dataBind(_, cache, api))))

		// console.log(mod)
		return mod
	},

	// 图表样式配置项格式化
	chartsStyleFormat(opts) {

	}
})