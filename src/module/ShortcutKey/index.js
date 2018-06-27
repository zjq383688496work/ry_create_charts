/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { message } from 'antd'

class ShortcutKey extends React.Component {
	constructor(props) {
		super(props)
		let pf = navigator.platform
		let os = ''
		if (/Mac\S+/.test(pf)) os = 'mac'
		else if (/Win\S+/.test(pf)) os = 'win'
		this.state = {
			active: false,
			os: os
		}
	}

	componentDidMount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.charts-content'}`)
		doc.addEventListener('mouseover', this._handleMouseOver)
		doc.addEventListener('mouseout',  this._handleMouseOut)
		document.addEventListener('keydown', this._handleKeyDown)
	}
	componentWillUnmount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.charts-content'}`)
		doc.removeEventListener('mouseover', this._handleMouseOver)
		doc.removeEventListener('mouseout',  this._handleMouseOut)
		document.removeEventListener('keydown', this._handleKeyDown)
	}
	_handleMouseOver = e => {
		this.setState({ active: true })
	}
	_handleMouseOut = e => {
		this.setState({ active: false })
	}
	_handleKeyDown = e => {
		let active = this.state.active
		if (!active) return
		let key   = e.key.toLocaleLowerCase()
		let ctrl  = e.ctrlKey? 'ctrl_': ''
		let shift = e.shiftKey? 'shift_': ''
		let Fn   = this[`key_${ctrl}${shift}${key}`]
		console.log(key)
		if (!Fn) return
		Fn(e)
	}
	// 复制
	// key_ctrl_c = (e) => {
	// 	this.copyComp(e)
	// }
	// 粘贴
	// key_ctrl_v = (e) => {
	// 	this.pasteComp(e)
	// }
	// 删除
	key_delete = (e) => {
		this.deleteChart(e)
	}
	key_backspace = (e) => {
		this.deleteChart(e)
	}

	deleteChart = (e) => {
		e.stopPropagation()
		let { actions }  = this.props
		message.success(`删除图表!`)
		actions.deleteChart()
	}

	render() {
		return null
		// return ENV === 'dev'
		// 	?
		// 	(<div className="shortcut-key">键盘操作: {this.state.active? '是': '否'}</div>)
		// 	:
		// 	false
	}
}

export default ShortcutKey