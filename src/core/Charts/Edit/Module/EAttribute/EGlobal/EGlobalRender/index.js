/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Card, Checkbox, Collapse, Input, Select, Tabs } from 'antd'
const { Option } = Select
const { TabPane } = Tabs
const { Panel }   = Collapse

const cData  = require('@state/chartsData/default')

import Color from '@module/Color'

const styleMap = {
	animation: '动画开关',
	title: '标题',
	tooltip: '提示框',
}
const childStyleMap = {
	color: '颜色',
	backgroundColor: '背景色',
	trigger: '触发模式',
	formatter: '模板',
	align: '水平对齐',
	verticalAlign: '垂直对齐',
	show: '显示',
	text: '文本',
	left: '对齐'
}
const apiMap = {
	global:    {
		data: '/api/charts/data/global',
		map:  '/api/charts/map/global'
	}
}
const apis = [
	{ name: '无', value: '' },
	{ name: '整体数据', value: 'global' }
]

class EGlobalRender extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	getData(val, cache) {
		let api = apiMap[val].data
		return (resolve, reject) => {
			Ajax.get(api, res => {
				cache.data = res
				resolve('数据')
			}, e => reject(e))
		}
	}
	getMap(val, cache) {
		let api = apiMap[val].map
		return (resolve, reject) => {
			Ajax.get(api, res => {
				cache.map = res
				resolve('数据')
			}, e => reject(e))
		}
	}
	onChangeAPI(val, parent, key) {
		let { actions, data, cache, onChange } = this.props
		let k = `c_${key}`
		parent.value.api = val
		if (!val) {
			delete cache[k]
			onChange()
		} else {
			cache[k] = {}
			let arr = ['getData', 'getMap']
			let promises = arr.map(_ => new Promise(this[_](val, cache[k])))
			onChange()
			Promise.all(promises).then(() => {
				actions.updateCache(cache)
			})
		}
	}
	dataTheme(obj) {
		let { config } = obj
		let { api, color } = config

		return Object.keys(config).map((_, i) => {
			let nod = config[_],
				dom = Object.keys(nod).map((p, j) => {
					let node = nod[p],
						{ name, type, value } = node,
						Fn = this[`render_${type}`]
					if (!Fn || !name) return null
					return Fn && (
						<div key={j} className="ca-row">
							<div className="car-name">{ childStyleMap[name] || name }</div>
							<div className="car-ctrl">{ Fn(value, node, p) }</div>
						</div>
					)
				})
			return (
				<Card title={_} key={i}>
					{ dom }
				</Card>
			)
		})
	}

	/* 渲染子模块 */
	// 单行文本
	// render_input = (val, parent) => {
	// 	let { api } = val
	// 	return (
	// 		<Input
	// 			min={0} max={100}
	// 			value={v}
	// 			onChange={e => this.onChange(e.target.value, parent)}
	// 			style={{ width: '100%' }}
	// 		/>
	// 	)
	// }
	// 颜色
	render_color = (val) => {
		return (
			<Color
				color={val}
				onChange={this.props.onChange}
			/>
		)
	}
	// 筛选框
	render_api = (val, parent, key) => {
		let { api } = val
		return (
			<Select size="small" style={{ width: 120 }} onChange={v => this.onChangeAPI(v, parent, key)} value={api}>
				{ apis.map((_, i) => (<Option key={i} value={_.value}>{_.name}</Option>)) }
			</Select>
		)
	}
	// 开关
	// render_boolean = (val, parent) => {
	// 	return (
	// 		<Checkbox
	// 			checked={val} onChange={v => this.onChange(v.target.checked? true: false, parent)}
	// 		/>
	// 	)
	// }

	render() {
		const { actions, data } = this.props
		const dom = this.dataTheme(data)
		return (
			<div className="ca-global-render">
				{ dom }
			</div>
		)
				// <Collapse defaultActiveKey={['1']}>
				// 	<Panel header={'配置项'} key="1">
				// 		{ dom }
				// 	</Panel>
				// </Collapse>
	}
}

export default EGlobalRender
