import 'core-js/fn/object/assign'
import React        from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'
import thunk        from 'redux-thunk'
import reducer      from '@store/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, hashHistory }   from 'react-router'
// import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Charts     from '@charts'
import ChartsEdit from '@charts/Edit'

import NoMatch from '@core/NoMatch'

import '@styles/common.less'
import 'antd/dist/antd.less'
import 'rc-color-picker/assets/index.css'
import 'react-grid-layout/css/styles.css'

import utils from '@public/utils'

const store = createStore(
	reducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="charts" component={Charts}>
				<Route path="edit" component={ChartsEdit} />
			</Route>
			<Route path="*" component={NoMatch} />
		</Router>
	</Provider>
), document.getElementById('app'))
