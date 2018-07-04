/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Card, Checkbox, Collapse, Icon, Input, Radio, Select, Tabs } from 'antd'
const { Button, Group } = Radio
const { Panel }   = Collapse
const { Option }  = Select
const { TabPane } = Tabs

const cData = require('@state/chartsData/default')

import ColorCustom from '@module/ColorCustom'

const apis  = [
	{ name: '无', value: '' },
	{ name: '整体数据', value: 'global' }
]
const apiMap = {
	global:    {
		data: '/api/charts/data/global',
		map:  '/api/charts/map/global'
	}
}
const styleMap = {
	api: '接口',
	series: '数据',
	xAxis:  'X轴',
	yAxis:  'Y轴'
}
const childStyleMap = {
	api:  '接口',
	bind: '绑定字段',
	type: '类型',
	stack: '堆栈',
	color: '颜色',
	backgroundColor: '背景色',
	trigger: '触发模式',
	formatter: '模板',
	align: '水平对齐',
	verticalAlign: '垂直对齐',
	show: '显示',
	text: '文本',
	left: '对齐',

	boundaryGap: '刻度分隔线',
	smooth: '曲线'
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
	onChangeAPI(val, parent) {
		let { actions, data, cache, onChange, curChart } = this.props
		parent.api = val
		let { id } = curChart,
			k = `c_${id}`
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
	onChangeColor = () => {
		const { global } = this.props
		const { idx, themes } = global
		cVar.colors = themes[idx].config.color
		this.props.onChange()
	}
	dataFormat(obj, name) {
		let { type, value, auth = true } = obj
		if (!auth) return null
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
		const { global } = this.props
		const { idx, themes } = global
		const colors = themes[idx].config.color
		return (
			<ColorCustom
				color={val}
				colors={colors}
				onChange={this.onChangeColor}
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
		const { cache, curChart } = this.props
		const { id } = curChart
		const api = this.props.parent.api
		const { value } = api
		let opts
		let ca = value === 'custom'? cache[`c_${id}`]: cache[`g_${value}`]
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
		const tapis = themes[idx].config.api
		const { api } = parent
		let opts = deepCopy(cData.api.options)
		Object.keys(tapis).map((_, i) => {
			opts.push({ name: tapis[_].name, value: _ })
		})
		let dom = opts.map((_, i) => {
			return <Option key={i} value={_.value}>{_.name}</Option>
		})
		let custom = (
			<Select
				size="small"
				style={{ width: 90 }}
				onChange={v => this.onChangeAPI(v, parent)}
				value={api}
			>
				{ apis.map((_, i) => (<Option key={i} value={_.value}>{_.name}</Option>)) }
			</Select>
		)
		let select = (
			<Select value={val} style={{ width: 90, marginRight: 10 }} onChange={v => this.onChange(v, parent)}>
				{ dom }
			</Select>
		)
		return (
			<div>
				{ select }
				{ val === 'custom'? custom: null }
			</div>
		)
	}

	renderDom(data, name) {
		let len = data.length
		return data.map((_, i) => {
			var remove = len > 1
				? (
					<a className="btn-remove" onClick={this.removeItem.bind(this, i)}><Icon type="close" /></a>
				)
				: false
			return (
				<Card key={i} title={`${styleMap[name]}${i+1}`} extra={remove}>
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
	onChangeStack(val, parent) {
		var str = val? '总量': ''
		parent.map((_, i) => {
			_.stack.value = str
		})
		this.props.onChange()
	}
	renderStack(data, name) {
		if (name !== 'series' || !data[0].stack) return null
		let stack = !!data[0].stack.value
		return (
			<div className="ca-row">
				<div className="car-name">{ childStyleMap.stack || name }</div>
				<div className="car-ctrl">
					<Checkbox
						checked={stack}
						onChange={v => this.onChangeStack(v.target.checked? true: false, data)}
					/>
				</div>
			</div>
		)
	}
	addItem = () => {
		const { data, onChange } = this.props
		data.push(deepCopy(data[0]))
		onChange()
	}
	removeItem = (idx) => {
		const { data, onChange } = this.props
		data.splice(idx, 1)
		onChange()
	}
	renderAdd(data, name) {
		if (name === 'api') return false
		return (
			<div className="ca-row">
				<div className="car-name"></div>
				<div className="car-ctrl">
					<a className="btn-add" onClick={this.addItem}><Icon type="plus" /></a>
				</div>
			</div>
		)
	}

	render() {
		const { actions, data, name } = this.props
		const stack = this.renderStack(data, name)
		const dom = this[`render${name === 'api'? 'Api': 'Dom'}`](data, name)
		const add = this.renderAdd(data, name)
		return (
			<div className="ca-content-render">
				<Collapse defaultActiveKey={['1']}>
					<Panel header={styleMap[name]} key="1">
						{ stack }
						{ dom }
						{ add }
					</Panel>
				</Collapse>
			</div>
		)
	}
}

export default EContentRender
