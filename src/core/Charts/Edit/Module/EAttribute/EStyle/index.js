/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import EStyleRender from './EStyleRender'

class EStyle extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}

	onChange = () => {
		const { actions, data } = this.props
		const { options } = data
		console.log(options)
		// debugger
		actions.updateChart(data)
	}

	renderDom(actions, opts) {
		return Object.keys(opts).map((_, i) => {
			return (<EStyleRender onChange={this.onChange} actions={actions} key={i} name={_} data={opts[_]} />)
		})
	}

	render() {
		const { actions, data } = this.props
		if (isEmptyObject(data)) return null
		const dom = this.renderDom(actions, data.options)
		return (
			<div className="ca-style">
				{ dom }
			</div>
		)
	}
}

export default EStyle
