/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Card, Checkbox, Collapse, Input, Radio, Select, Tabs } from 'antd'
const { Button, Group } = Radio
const { Panel }   = Collapse
const { Option }  = Select
const { TabPane } = Tabs

const cData  = require('@state/chartsData/default')

import Color from '@module/Color'

const styleMap = {
	api: '接口',
	series: '数据',
	xAxis:  'X轴',
	yAxis:  'Y轴'
}
const childStyleMap = {
	bind: '绑定字段',
	// bind: '绑定字段',
	color: '颜色',
	backgroundColor: '背景色',
	trigger: '触发模式',
	formatter: '模板',
	align: '水平对齐',
	verticalAlign: '垂直对齐',
	show: '显示',
	text: '文本',
	left: '对齐',

	boundaryGap: '刻度分隔线'
}

class EContentRender extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}

	onChange(val, parent) {
		parent.value = val
		this.props.onChange()
	}

	dataFormat(obj, name) {
		let { type, value } = obj
		if (type === 'type') return null
		if (value === undefined) {
			value = obj.value = deepCopy(cData[type].default)
		}
		switch (type) {
			case 'object':
				if (isEmptyObject(value)) return null
				return Object.keys(value).map((_, i) => {
					return <div key={i}>{ this.dataFormat(value[_], _) }</div>
				})

			default:
				const ty = cData[type].type
				// console.log(type, ty)
				const Fn = this[`render_${ty}`]
				if (!Fn || !name) return null
				return Fn && (
					<div className="ca-row">
						<div className="car-name">{ childStyleMap[name] || name }</div>
						<div className="car-ctrl">{ Fn(value, obj, cData[type]) }</div>
					</div>
				)
		}
	}

	/* 渲染子模块 */
	// 单行文本
	render_input = (val, parent) => {
		let v = val
		return (
			<Input
				min={0} max={100}
				value={v}
				onChange={e => this.onChange(e.target.value, parent)}
				style={{ width: '100%' }}
			/>
		)
	}
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
	render_radio = (val, parent, { options }) => {
		return (
			<Group size="small" onChange={e => this.onChange(e.target.value, parent)} value={val}>
				{ options.map((_, i) => (<Button key={i} value={_.value}>{_.name}</Button>)) }
			</Group>
		)
	}
	// 开关
	render_boolean = (val, parent) => {
		return (
			<Checkbox
				checked={val} onChange={v => this.onChange(v.target.checked? true: false, parent)}
			/>
		)
	}
	// 字段
	render_field = (val, parent) => {
		const { cache } = this.props
		const api = this.props.parent.api
		const { value, data } = api
		let ca, opts
		if (value === 'custom') {
			
		} else {
			ca = cache[`g_${value}`]
		}
		if (ca && ca.map) {
			const { map } = ca
			opts = map? Object.keys(map).map((_, i) => <Option key={i+1} value={_}>{map[_]}</Option>): null
		}
		return (
			<Select value={val} style={{ width: 120 }} onChange={v => this.onChange(v, parent)}>
				<Option key={0} value="">无</Option>
				{ opts }
			</Select>
		)
	}
	// 接口
	render_api = (val, parent) => {
		const { cache, global } = this.props
		const { idx, themes } = global
		const apis = themes[idx].config.api
		let opts = deepCopy(cData.api.options)
		Object.keys(apis).map((_, i) => {
			opts.push({ name: apis[_].name, value: _ })
		})
		let dom = opts.map((_, i) => {
			return <Option key={i} value={_.value}>{_.name}</Option>
		})
		return (
			<Select value={val} style={{ width: 120 }} onChange={v => this.onChange(v, parent)}>
				{ dom }
			</Select>
		)
	}

	renderDom(data, name) {
		return data.map((_, i) => {
			return (
				<Card key={i} title={`${styleMap[name]}${i+1}`}>
					{
						Object.keys(_).map((p, j) => {
							return <div key={j}>{ this.dataFormat(_[p], p) }</div>
						})
					}
				</Card>
			)
		})
	}
	renderApi(data, name) {
		return this.dataFormat(data, name)
	}

	render() {
		const { actions, data, name } = this.props
		const dom = this[`render${name === 'api'? 'Api': 'Dom'}`](data, name)
		return (
			<div className="ca-content-render">
				<Collapse defaultActiveKey={['1']}>
					<Panel header={styleMap[name]} key="1">
						{ dom }
					</Panel>
				</Collapse>
			</div>
		)
	}
}

export default EContentRender
