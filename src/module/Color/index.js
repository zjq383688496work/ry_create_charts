/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import ColorPicker from 'rc-color-picker'
import { Row, Col } from 'antd'


class Color extends React.Component {
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

	render() {
		let { color, placement }  = this.props
		return (
			<Row>
				<Col span={6}>
					<ColorPicker
						alpha={color.alpha === undefined? 100: color.alpha}
						color={color.color || '#333'}
						onClose={this.changeColor}
						placement={ placement || 'bottomLeft' }
					/>
				</Col>
			</Row>
		)
	}
}

export default Color
