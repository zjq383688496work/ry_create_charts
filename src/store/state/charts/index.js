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
				color: {
					0: {
						type:  'color',
						name:  '颜色1',
						value: { color: '#333', alpha: 100 }
					}
				}
			}
		}]
	}
}