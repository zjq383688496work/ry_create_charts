/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions'

import './index.less'

import EHeader    from '@editM/EHeader'
import EContent   from '@editM/EContent'
import EAttribute from '@editM/EAttribute'

import { Layout, Menu, Icon, Spin } from 'antd'
const { Header, Content, Footer, Sider } = Layout

class EditComponent extends React.Component {
	state = {
		st: Date.now(),
		render: false
	}
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	onLoad = () => {
		console.log(Date.now() - this.state.st)
		this.setState({ render: true })
	}

	render() {
		const { actions, editConfig } = this.props
		const { render } = this.state
		const { config, curData, curChart, global, cache } = editConfig

		return (
			<div className="lay-win flex-col">
				<div className="lay-header">
					<EHeader actions={actions} onLoad={this.onLoad} />
				</div>
				<div className="lay-row flex-1">
					<div className="lay-sidebar">
						<EAttribute actions={actions} data={curChart} global={config.global} cache={cache} />
					</div>
					<div className="lay-content">
						{ render? <EContent actions={actions} data={config.charts} curData={curData} cache={cache} />: <Spin/> }
					</div>
				</div>
			</div>
		)
	}
}

EditComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditComponent)
