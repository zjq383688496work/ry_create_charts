const colors = [
	'#c23531',
	'#2f4554',
	'#61a0a8',
	'#d48265',
	'#91c7ae',
	'#749f83',
	'#ca8622',
	'#bda29a',
	'#6e7074',
	'#546570',
	'#c4ccd3'
]
const colorObj = {}
colors.map((_, i) => {
	colorObj[i] = {
		type:  'color',
		name:  `颜色${i + 1}`,
		value: { color: _, alpha: 100 }
	}
})
// 图表数据大纲
module.exports = {

	charts:  [],	// 图表对象
	global:  {
		idx: 0,
		charts: {
			max: 0
		},
		api: {
			max: {
				api:   1,
				color: 1
			}
		},
		themes: [{
			name: '主题1',
			config: {
				api: {
					0: {
						type:  'api',
						name:  '全局数据',
						value: {
							api: ''
						}
					}
				},
				color: colorObj
			}
		}]
	}
}