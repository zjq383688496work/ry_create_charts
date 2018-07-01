/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import ChartsDraw from './ChartsDraw'

import ShortcutKey from '@module/ShortcutKey'

import RGL, { WidthProvider } from 'react-grid-layout'
const ReactGridLayout = WidthProvider(RGL)

class EContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			layout: this.generateLayout(),
			dom:    this.generateDOM()
		}
	}
	componentWillMount() {}
	// shouldComponentUpdate() {}
	componentWillReceiveProps() {
		this.setState({
			layout: this.generateLayout(),
			dom:    this.generateDOM()
		})
	}
	componentDidMount() {}

	selectChart(e, idx) {
		e.stopPropagation()
		const { actions } = this.props
		actions.selectChart(idx)
	}
	
	generateLayout() {
		const { data } = this.props
		const len = data.length
		if (!data.length) return []
		return data.map((item, i) => {
			const { layout } = item
			const { x, y }   = layout
			return {
				...item.layout,
				i: i.toString()
			}
		})
	}

	generateDOM() {
		const { data, curData, cache } = this.props
		return data.map((item, i) => {
			return (
				<div key={i} className={`cc-item${curData.idx === i? ' s-active': ''}`} onClick={e => this.selectChart(e, i)}>
					<ChartsDraw data={item} idx={i} cache={cache} />
				</div>
			)
		})
	}

	onLayoutChange = (layout, oldItem, newItem, placeholder, e) => {
		this.selectChart(e, +oldItem.i)
		if(JSON.stringify(oldItem) === JSON.stringify(newItem)) {
			return
		}
		const { actions } = this.props
		actions.updateLayout(layout)
	}

	render() {
		const { layout, dom } = this.state
		const { actions, curData } = this.props
		return (
			<div className="charts-content">
				<ReactGridLayout
					layout={layout}
					onDragStop={this.onLayoutChange}
					onResizeStop={this.onLayoutChange}
					cols={curData.cols}
					rowHeight={curData.rowHeight}
				>
					{ dom }
				</ReactGridLayout>
				<ShortcutKey actions={actions} />
			</div>
		)
	}
}

export default EContent
