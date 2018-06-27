const path  = require('path')
const projectRoot = process.cwd()
const webpack = require('webpack')
const HtmlWebpackPlugin    = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

let moduleName = 'wxa'
let staticName = `${moduleName}_static`
module.exports = {
	entry: path.resolve('./index.js'),
	output: {
		libraryTarget: 'var',
		path: path.resolve(projectRoot, './dist/'),
		publicPath: '/',
		filename: '[name]_[hash:8].js',
		chunkFilename: '[name]_[hash:8].js'
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './src/index.html',
			filename: 'index.html'
		})

		// 开启 热更新
		// new webpack.HotModuleReplacementPlugin(),

		// new webpack.NoErrorsPlugin()
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: ['react-hot-loader', 'babel-loader'],
				exclude: /node_modules/,
				include: [].concat(
					[ path.join(__dirname, '/../src') ]
				)
			},
			{
				test: /\.css/,
				loader: 'style-loader?sourceMap=true!css-loader?sourceMap=true!postcss-loader?sourceMap=true'
			},
			{
				test: /\.less/,
				loader: 'style-loader?sourceMap=true!css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=true&javascriptEnabled=true'
			},
			{
				test: /\.(jpe?g|png|gif|svg|ttf|woff2?|eot|otf)\??.*$/,
				// loaders: ['url-loader?limit=10000&name=[path][name]_[hash:8].[ext]']
				loader: 'file-loader?name=[path][name]_[hash:8].[ext]'
			}
		]
	},

	resolve: {
		modules: [
			'node_modules',
			path.resolve(projectRoot)
		],
		extensions: ['.js', '.json'],
		alias: {
			'@core':   'src/core',
			'@charts': 'src/core/Charts',
			'@styles': 'src/styles',
			'@store':  'src/store',
			'@state':  'src/store/state',
			'@public': 'src/public',
			'@module': 'src/module',
			'@editM':  'src/core/Charts/Edit/Module',
			'actions': 'src/store/actions',
			'react/lib/ReactMount': 'react-dom/lib/ReactMount'
		}
	}
}