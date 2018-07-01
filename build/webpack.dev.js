var path = require('path')
var projectRoot = process.cwd()
console.log('projectRoot', projectRoot)

const config  = require('./webpack.base.js')
const webpack = require('webpack')
const merge   = require('webpack-merge')

const port   = 8222
const target = 'http://java1.rongyi.com'

config.plugins && config.plugins.unshift(
	new webpack.DefinePlugin({
		ENV: JSON.stringify('dev')
	}),
	// new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
)

Object.assign(config, {
	entry: [
		`webpack-dev-server/client?http://127.0.0.1:${port}`,
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	cache: true,
	devtool: 'eval-source-map',
	devServer: {
		port: port,
		historyApiFallback: true,
		stats: 'errors-only',
		hot: true,
		noInfo: false,
		proxy: {
			'/api/charts': {
				target: 'http://localhost:4080',
				secure: false,
				changeOrigin: 'true',
			}
		}
	}
})

module.exports = config