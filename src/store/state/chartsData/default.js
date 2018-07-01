const style   = require('./default/style')
const content = require('./default/content')
const data    = require('./default/data')

// 默认值
module.exports = {
	// 类型
	type: { type: 'radio', default: 'line', options: [
		{ name: '折线图', value: 'line' },
		{ name: '柱状图', value: 'bar' }
	] },
	...style,
	...content,
	...data
}