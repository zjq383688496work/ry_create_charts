// 默认值
module.exports = {
	// 布尔值
	checkbox:      { type: 'boolean', default: true },
	animation:     { type: 'boolean', default: false },
	// 触发类型
	trigger:       { type: 'radio', default: 'item', options: ['item', 'axis', 'none'] },
	// 文本
	text:          { type: 'string', default: '' },
	// 颜色
	color:         { type: 'string', default: { color: '#333', alpha: 1 } },
	/* Style */
	// 水平对齐
	align:         { type: 'radio', default: null, options: [null, 'left', 'center', 'right'] },
	// 垂直对齐
	vAlign:        { type: 'radio', default: null, options: [null, 'top', 'middle', 'bottom'] },
	// 类型
	type:          { type: 'radio', default: 'line', options: [ 'line', 'bar' ] },
	// XY轴类型
	xType:         { type: 'radio', default: 'category', options: [ 'value', 'category', 'time', 'log' ] },
	yType:         { type: 'radio', default: 'value',    options: [ 'value', 'category', 'time', 'log' ] },

	// 对象
	object:        { type: 'object', default: {} },
	/* 假数据 */
	// 数据1
	dataNumber:    { type: 'array', default: [ 10, 20, 30, 40, 50, 35, 60 ] },
	dataCategory:  { type: 'array', default: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ] }
}