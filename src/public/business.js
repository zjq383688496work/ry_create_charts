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
				var rgba = [ ...color.colorRGB(), ( alpha || 1 ) * 100 ]
				obj[_] = `rgba(${rgba.join(',')})`
			}
			if (obj[_] === 'null') {
				delete obj[_]
			}
		})
		return obj
	},

	// 图表配置项格式化
	chartsFormat(opts) {
		// console.clear()
		opts = deepCopy(opts)
		const { data, options } = opts
		// console.log(data, options)
		const { series, xAxis, yAxis } = data

		let mod = this.dataFormat(options)
		mod.series = series.map((_) => this.dataFormat(_))
		xAxis && (mod.xAxis = xAxis.map((_) => this.dataFormat(_)))
		yAxis && (mod.yAxis = yAxis.map((_) => this.dataFormat(_)))

		// console.log(mod)
		return mod
	},

	// 图表样式配置项格式化
	chartsStyleFormat(opts) {

	}
})