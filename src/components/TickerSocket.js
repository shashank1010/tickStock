import React from "react"
import { connect } from 'react-redux'

import { updateStocklist, updateConnection } from "../store/actions"

class TickerSocketDumb extends React.Component{
	hasError = false
	message = ""
	componentDidMount() {
		this.connection = new WebSocket('ws://stocks.mnet.website');
		this.connection.onmessage = this.props.updateStocklist

		this.connection.onopen = (e) => {
			this.hasError = false
			this.message = ""
			this.updateConnectionStatus(e.type, this.message, this.hasError)
		}

		this.connection.onclose = (e) => {
			this.updateConnectionStatus(e.type, this.message, this.hasError)
		}

		this.connection.onerror = (e) => {
			this.hasError = true
			this.message = "Something went wrong"
			this.updateConnectionStatus(e.type, this.message, this.hasError)
		}
	}

	updateConnectionStatus() {
		this.props.updateConnection(...arguments)
	}

	render() {
		return null
	}
}


const mapDispatchToProps = { updateStocklist, updateConnection }
  
const TickerSocket = connect(null, mapDispatchToProps)(TickerSocketDumb)

export default TickerSocket