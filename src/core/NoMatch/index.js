import React from 'react'
import { hashHistory } from 'react-router'

class NoMatchComponent extends React.Component {
	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<div className="">
				您输入的URL地址有误~/(ㄒoㄒ)/~~
			</div>
		)
	}
}

export default NoMatchComponent
