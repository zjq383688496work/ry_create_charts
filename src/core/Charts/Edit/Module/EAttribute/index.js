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

class EAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentWillMount() {}

	componentDidMount() {}

	render() {
		return (
			<div className="charts-attr">
				属性
			</div>
		)
	}
}

EAttribute.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EAttribute)
