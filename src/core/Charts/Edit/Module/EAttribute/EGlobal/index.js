/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import EGlobalRender from './EGlobalRender'
import ThemeManage   from './ThemeManage'

class EGlobal extends React.Component {
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

	renderDom(actions, opts, cache) {
		let { idx, max, themes } = opts,
			theme = themes[idx]
		if (!theme) return null
		return (<EGlobalRender onChange={this.onChange} actions={actions} data={theme} cache={cache} />)
	}

	render() {
		const { actions, global, cache } = this.props
		if (isEmptyObject(global)) return null
		const dom = this.renderDom(actions, global, cache)
		return (
			<div className="ca-global">
				
				{ dom }
			</div>
		)
	}
}

export default EGlobal
