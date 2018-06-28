/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import './index.less'

import { Spin } from 'antd'

// import ReactEcharts           from 'echarts-for-react'
import ReactEchartsCore       from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/treemap'
// import 'echarts/lib/chart/graph'
// import 'echarts/lib/chart/gauge'
// import 'echarts/lib/chart/funnel'
// import 'echarts/lib/chart/parallel'
// import 'echarts/lib/chart/sankey'
// import 'echarts/lib/chart/boxplot'
// import 'echarts/lib/chart/candlestick'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/chart/lines'
// import 'echarts/lib/chart/heatmap'
// import 'echarts/lib/component/graphic'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/parallel'
// import 'echarts/lib/component/singleAxis'
// import 'echarts/lib/component/brush'
import 'echarts/lib/component/title'
// import 'echarts/lib/component/dataZoom'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/markPoint'
// import 'echarts/lib/component/markLine'
// import 'echarts/lib/component/markArea'
// import 'echarts/lib/component/timeline'
// import 'echarts/lib/component/toolbox'

import RGL, { WidthProvider } from 'react-grid-layout'
const ReactGridLayout = WidthProvider(RGL)

class ChartsDraw extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true
		}
	}
	componentWillMount() {
		this.getData(2000)
	}
	componentWillReceiveProps() {
		// this.setState({ loading: true })
		this.getData(1)
	}
	componentDidMount() {}

	getData(time) {
		const { data } = this.props
		setTimeout(() => {
			this.setState({
				opts: window.charts.chartsFormat(data),
				loading: false
			})
		}, time || 0)
	}

	render() {
		const { idx, data } = this.props
		const { loading, opts } = this.state

		console.log(opts)
		return (
			<div className="charts-draw">
				<div className="cd-layout">
					{ JSON.stringify(data.layout) }
				</div>
				{ loading? <Spin/>: (
					<ReactEchartsCore
						echarts={echarts}
						notMerge={true}
						lazyUpdate={true}
						option={opts || {}}
						style={{height: '100%'}}
					/>
				) }
			</div>
		)
	}
}

export default ChartsDraw
