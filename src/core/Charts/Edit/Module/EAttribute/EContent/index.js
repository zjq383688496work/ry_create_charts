/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Radio, Tabs } from 'antd'
const { Button, Group } = Radio
const { TabPane } = Tabs

class EContent extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}

	onChange(value) {
	}

	render() {
		const { actions, data } = this.props
		return (
			<div className="ca-content">
				内容
			</div>
		)
	}
}

export default EContent
