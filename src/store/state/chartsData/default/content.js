let typeOpts = [
	{ name: '数值', value: 'value' },
	{ name: '类目', value: 'category' },
	{ name: '时间', value: 'time' },
	{ name: '对数', value: 'log' }
]

// XY轴类型
module.exports = {
	xType: { type: 'radio', default: 'category', options: typeOpts },
	yType: { type: 'radio', default: 'value',    options: typeOpts }
}