// 默认值
module.exports = {
	// 布尔值
	checkbox:      { type: 'boolean', default: true },
	animation:     { type: 'boolean', default: false },
	// 触发类型
	trigger:       { type: 'radio', default: 'item', options: [
		{ name: '数据项', value: 'item' },
		{ name: '坐标轴', value: 'axis' },
		{ name: '不触发', value: 'none' }
	] },
	// 文本
	text:          { type: 'input', default: '' },
	// 颜色
	color:         { type: 'color', default: { color: '#333', alpha: 100 } },
	/* Style */
	// 水平对齐
	align:         { type: 'radio', default: '', options: [
		{ name: '无',   value: '' },
		{ name: '左',   value: 'left' },
		{ name: '居中', value: 'center' },
		{ name: '右',   value: 'right' }
	] },
	// 垂直对齐
	vAlign:        { type: 'radio', default: '', options: [
		{ name: '无',   value: '' },
		{ name: '顶部', value: 'top' },
		{ name: '居中', value: 'middle' },
		{ name: '底部', value: 'bottom' }
	] },
	// 类型
	type:          { type: 'radio', default: 'line', options: [
		{ name: '折线图', value: 'line' },
		{ name: '柱状图', value: 'bar' }
	] },
	// XY轴类型
	xType:         { type: 'radio', default: 'category', options: [
		{ name: '数值', value: 'value' },
		{ name: '类目', value: 'category' },
		{ name: '时间', value: 'time' },
		{ name: '对数', value: 'log' }
	] },
	yType:         { type: 'radio', default: 'value',    options: [
		{ name: '数值', value: 'value' },
		{ name: '类目', value: 'category' },
		{ name: '时间', value: 'time' },
		{ name: '对数', value: 'log' }
	] },

	// 对象
	object:        { type: 'object', default: {} },
	/* 假数据 */
	// 数据1
	dataNumber:    { type: 'array', default: [ 10, 20, 30, 40, 50, 35, 60 ] },
	dataCategory:  { type: 'array', default: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ] }
}