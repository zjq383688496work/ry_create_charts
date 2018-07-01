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
					value: '总量'
				},
				areaStyle: {
					type: 'object',
					value: {
						normal: {
							type: 'object'
						}
					}
				},
				type: {
					type: 'type',
					value: 'line'
				}
			},
			{
				bind: {
					type: 'field'
				},
				data: {
					type: 'dataNumber'
				},
				stack: {
					type: 'text',
					value: '总量2'
				},
				areaStyle: {
					type: 'object',
					value: {
						normal: {
							type: 'object'
						}
					}
				},
				type: {
					type: 'type',
					value: 'line'
				}
			}
		],
		xAxis: [
			{
				type: {
					type: 'xType'
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
							type: 'color',
							value: { color: '#333', alpha: 100 }
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
					value: { color: '#333', alpha: 70 }
				}
			}
		},
		animation: {
			type: 'animation'
		}
	}
}