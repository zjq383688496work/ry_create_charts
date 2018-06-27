const webpackConfig = require('./webpack.base.js')
const webpack       = require('webpack')

config.plugins && config.plugins.unshift(
	new webpack.DefinePlugin({
		ENV: JSON.stringify('qa')
	})
)

module.exports = webpackConfig