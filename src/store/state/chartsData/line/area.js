module.exports = {
	layout: {},
	content: {
		map: {},
		api: {
			type: 'api',
			value: {}
		}
	},
	data: {
		api: {
			type: 'api',
			api: ''
		},
		series: [
			{
				bind: {
					type: 'field'
				},
				data: {
					type: 'dataNumber'
				},
				stack: {
					type: 'text',
					value: '总量',
					auth: false
				},
				areaStyle: {
					type: 'object',
					value: {
						normal: {
							type: 'object'
						}
					}
				},
				lineStyle: {
					type: 'object',
					value: {
						color: {
							type: 'color'
						}
					}
				},
				smooth: {
					type: 'checkbox',
					value: false
				},
				type: {
					type: 'type',
					value: 'line',
					auth: false
				}
			}
		],
		xAxis: [
			{
				type: {
					type: 'xType'
				},
				bind: {
					type: 'field'
				},
				boundaryGap: {
					type: 'checkbox',
					value: false
				},
				data: {
					type: 'dataCategory'
				}
			}
		],
		yAxis: [
			{
				type: {
					type: 'yType'
				}
			}
		]
	},
	options: {
		title: {
			type: 'object',
			value: {
				show: {
					type: 'checkbox',
					value: true
				},
				text: {
					type: 'text',
					value: ''
				},
				left: {
					type: 'align'
				},
				textStyle: {
					type: 'object',
					value: {
						color: {
							type: 'textcolor'
						}
					}
				}
			}
		},
		tooltip: {
			type: 'object',
			value: {
				show: {
					type: 'checkbox'
				},
				trigger: {
					type: 'trigger'
				},
				formatter: {
					type: 'text',
					value: ''
				},
				backgroundColor: {
					type: 'color',
					value: { type: 'custom', color: '#333', alpha: 70 }
				}
			}
		},		
		animation: {
			type: 'animation'
		}
	}
}