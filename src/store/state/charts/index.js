// 图表数据大纲
module.exports = {
	title:   '首页',	// 页面标题
	charts:  [],	// 图标对象
	global:  {
		idx: 0,
		max: {
			api:   1,
			color: 1
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