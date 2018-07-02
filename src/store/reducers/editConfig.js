/*
* @Author: Liao Hui
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:06:11+08:00
*/

import * as types from '../constants'
import state from '@state'

const chartsData = require('@state/chartsData')

const initialState = state

export default function editConfig(state = initialState, action) {
	let curData   = state.curData,
		curChart  = state.curChart,
		config    = state.config,
		charts    = config.charts,
		global    = config.global,
		idx       = action.idx,
		data      = action.data,
		parentKey = action.parentKey,
		key       = action.key

	switch (action.type) {
		// 组件操作
		case types.ADD_CHART:
			try {
				++global.charts.max
				const da  = deepCopy(chartsData[parentKey].child[key])
				da.id = global.charts.max
				const len = charts.length
				da.layout = {
					x: (len * 2) % curData.cols,
					// x: 0,
					y: 0,
					w: 2,
					h: 8,
					moved:  false,
					static: false
				}
				charts.push(da)
				state.curChart = da
				curData.idx    = charts.length - 1
				curData.type   = 'charts'
				return Object.assign({}, state)
			} catch(e) {
				console.log(e)
				return state
			}

		case types.UPDATE_CHART:
			charts[curData.idx] = data
			return Object.assign({}, state)

		case types.UPDATE_LAYOUT:
			data.map((_, i) => {
				let l = charts[i].layout
				Object.keys(l).map((p, j) => {
					l[p] = _[p]
				})
			})
			return Object.assign({}, state)

		case types.DELETE_CHART:
			charts.splice(curData.idx, 1)
			return Object.assign({}, state)

		case types.SELECT_CHART:
			curData.idx = idx
			state.curChart = charts[idx]
			return Object.assign({}, state)

		case types.UPDATE_CACHE:
			state.cache = data
			return Object.assign({}, state)

		default:
			return state
	}
}
