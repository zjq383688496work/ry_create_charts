/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:25:03+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:28:52+08:00
 */

'use strict';

import * as types from '../constants'


// 组件操作
export const addChart = (parentKey, key) => ({
	type: types.ADD_CHART,
	parentKey,
	key
})

export const updateChart = (data) => ({
	type: types.UPDATE_CHART,
	data
})

export const updateLayout = (data) => ({
	type: types.UPDATE_LAYOUT,
	data
})

export const deleteChart = (idx) => ({
	type: types.DELETE_CHART,
	idx
})


export const selectChart = (idx) => ({
	type: types.SELECT_CHART,
	idx
})

// 当前操作项
export const updateCur = (data) => ({
	type: types.UPDATE_CUR,
	data
})

// 快速操作
export const updateCopyChart = (data) => ({
	type: types.UPDATE_COPYCHART,
	data
})


// 更新缓存
export const updateCache = (data) => ({
	type: types.UPDATE_CACHE,
	data
})