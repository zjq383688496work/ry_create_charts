/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Checkbox, Collapse, Input, Select, Tabs } from 'antd'
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
	{ name: '全局数据', value: 'global' }
]

class EGlobal extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
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
		let { actions, data, cache } = this.props
		parent.value.api = val
		if (!val) {
			delete cache[val]
			this.props.onChange()
		} else {
			cache[key] = {}
			let arr = ['getData', 'getMap']
			let promises = arr.map(_ => new Promise(this[_](val, cache[key])))
			Promise.all(promises).then(() => {
				console.log(cache[key])
				// actions
			})
		}
	}

	dataTheme(obj) {
		let { config, list } = obj
		return list.map((_, i) => {
			let node = config[_],
				{ name, type, value } = node,
				Fn = this[`render_${type}`]
			if (!Fn || !name) return null
			return Fn && (
				<div key={i} className="ca-row">
					<div className="car-name">{ childStyleMap[name] || name }</div>
					<div className="car-ctrl">{ Fn(value, node, _) }</div>
				</div>
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
			<Select size="small" onChange={v => this.onChangeAPI(v, parent, key)} value={api}>
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
			<div className="ca-style-render">
				<Collapse defaultActiveKey={['1']}>
					<Panel header={styleMap[name]} key="1">
						{ dom }
					</Panel>
				</Collapse>
			</div>
		)
	}
}

export default EGlobal
