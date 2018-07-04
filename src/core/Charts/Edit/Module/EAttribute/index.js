/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Tabs } from 'antd'
const { TabPane } = Tabs

import EContent from './EContent'
import EStyle   from './EStyle'
import EGlobal  from './EGlobal'

class EAttribute extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}

	onChange(value) {
	}

	render() {
		const { global } = this.props
		const { idx, themes } = global
		const colors = (themes[idx] || themes[0]).config.color
		cVar.colors = colors
		return (
			<div className="charts-attr">
				<Tabs type="card" animated={false} defaultActiveKey="content">
					<TabPane tab="内容" key="content">
						<EContent {...this.props} />
					</TabPane>
					<TabPane tab="样式" key="style">
						<EStyle {...this.props} />
					</TabPane>
					<TabPane tab="全局" key="global">
						<EGlobal {...this.props} />
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default EAttribute
