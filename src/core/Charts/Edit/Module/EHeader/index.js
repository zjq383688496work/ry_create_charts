/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import * as vari from '@state/var'

const { chartsList } = vari

import { Icon } from 'antd'


class EHeader extends React.Component {
	state = {
	}
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {
		setTimeout(() => {
			this.props.onLoad()
		}, 100)
	}

	addChart(parentKey, key) {
		let { actions } = this.props
		return actions.addChart(parentKey, key)
	}

	render() {
		const clDom = chartsList.map((_, i) => {
			const { name, child, key, icon } = _
			const chd = child? child.map((p, j) => {
				return (
					<div key={j} onClick={this.addChart.bind(this, key, p.key)}>
						<p>{ p.name }</p>
						<img src={p.img} />
					</div>
				)
			})
			: null
			return (
				<li key={i} className="cs-item">
					<div className="cs-title">
						<Icon type="user" />
						{ _.name }
					</div>
					<div className="cs-child">
						{ chd }
					</div>
				</li>
			)
		})
		return (
			<div className="charts-sidebar">
				<div className="cs-left"></div>
				<div className="cs-center">
					<ul className="cs-menu">
						{ clDom }
					</ul>
				</div>
				<div className="cs-right"></div>
			</div>
		)
	}
}

export default EHeader
