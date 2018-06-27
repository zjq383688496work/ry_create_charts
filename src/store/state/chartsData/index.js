// const common = require('state/common')
// let { authInit } = common

// 组件元素数据
module.exports = {
	/* 折线图 */
	line: {
		default: require('./line/default'),
		child: {
			basic:  require('./line/basic'),	// 标准图
			area:   require('./line/area'),		// 区域图
			smooth: require('./line/smooth')	// 曲线图
		}
	}
}