// 默认值
module.exports = {
	// 开关
	checkbox:      { type: 'boolean', default: true },
	// 动画开关
	animation:     { type: 'boolean', default: false },
	// 触发类型
	trigger:       { type: 'radio', default: 'axis', options: [
		{ name: '数据项', value: 'item' },
		{ name: '坐标轴', value: 'axis' },
		{ name: '不触发', value: 'none' }
	] },
	// 文本
	text:          { type: 'input', default: '' },
	// 颜色
	color:         { type: 'color', default: { color: '#333', alpha: 100 } },
	// 水平对齐
	align:         { type: 'radio', default: 'null', options: [
		{ name: '无',   value: 'null' },
		{ name: '左',   value: 'left' },
		{ name: '居中', value: 'center' },
		{ name: '右',   value: 'right' }
	] },
	// 垂直对齐
	vAlign:        { type: 'radio', default: 'null', options: [
		{ name: '无',   value: 'null' },
		{ name: '顶部', value: 'top' },
		{ name: '居中', value: 'middle' },
		{ name: '底部', value: 'bottom' }
	] },
	// 对象
	object:        { type: 'object', default: {} },
	magictype:     { type: 'checkbox', default: [], options: [
		{ name: '折线图',   value: 'line' },
		{ name: '柱状图',   value: 'bar' },
		{ name: '堆叠模式', value: 'stack' },
		{ name: '平铺模式', value: 'tiled' }
	] }
}