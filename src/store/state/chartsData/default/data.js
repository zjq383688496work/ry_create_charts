let apis = [
	{
		name: '总体数据',
		value: '/api/data'
	}
]

/* 数据 */
module.exports = {
	dataNumber:    { type: 'array', default: [ 10, 20, 30, 40, 50, 35, 60 ] },
	dataCategory:  { type: 'array', default: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ] },
	api:           { type: 'api', default: 'custom', options: apis },
	field:         { type: 'field', default: '', options: [] }
}