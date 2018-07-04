/* window 扩展方法 */
const extend = require('util')._extend

module.exports = extend(window, {
	cVar: {
		colors: {}
	}
})