/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Checkbox, Collapse, Input, Radio, Select, Tabs } from 'antd'
const { Button, Group } = Radio
const { Panel }   = Collapse
const { Option }  = Select
const { TabPane } = Tabs

const cData  = require('@state/chartsData/default')

import Color from '@module/Color'

const styleMap = {
	series: '数据',
	xAxis:  'X轴',
	yAxis:  'Y轴'
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
	left: '对齐',

	boundaryGap: '刻度分隔线'
}

class EStyleRender extends React.Component {
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
		return (
			<Select value="">
				<Option value="">无</Option>
			</Select>
		)
	}

	renderDom(data, name) {
		return data.map((_, i) => {
			return Object.keys(_).map((p, j) => {
				return this.dataFormat(_[p], p)
			})
		})
	}

	render() {
		const { actions, data, name } = this.props
		const dom = this.renderDom(data, name)
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

export default EStyleRender
