/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import ColorPicker from 'rc-color-picker'
import { Row, Col, Select } from 'antd'
const { Option } = Select


class ColorCustom extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	changeColor = (c) => {
		let { color }  = this.props
		color.alpha = c.alpha
		color.color = c.color
		this.props.onChange()
	}

	changeColorType = (val) => {
		let { color }  = this.props
		color.type = val
		this.props.onChange()
	}

	render() {
		let { color, placement, colors }  = this.props
		let { type } = color
		let cp
		colors = Object.assign({}, {
			custom: {
				type:  'color',
				name:  '自定义',
				value: {
					color: color.color,
					alpha: color.alpha
				}
			},
			null: {
				type:  'null',
				name:  '默认'
			}
		}, deepCopy(colors))
		let options = Object.keys(colors).map(_ => {
			let col = colors[_]
			let { value } = col
			let box = value
				? (
					<span className="pgt-color">
						<span className="pgt-color-icon" style={{backgroundColor: value.color}}></span>
					</span>
				)
				: null

			return (
				<Option key={_} value={_}>
					<div className="pgt-row">
						{ box }
						{ col.name }
					</div>
				</Option>
			)
		})
		if (type === 'custom') {
			cp = (
				<Col span={6}>
					<ColorPicker
						alpha={color.alpha === undefined? 100: color.alpha}
						color={color.color || '#333'}
						onClose={this.changeColor}
						placement={ placement || 'bottomLeft' }
					/>
				</Col>
			)
		}
		return (
			<Row>
				<Col span={18}>
					<Select
						style={{ width: 120 }}
						value={type}
						defaultValue={type}
						onChange={this.changeColorType}
					>
						{ options }
					</Select>
				</Col>
				{ cp }
			</Row>
		)
	}
}

export default ColorCustom
