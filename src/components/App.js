import '../styles/App.css';

import React from 'react';
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import { connect } from "react-redux"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

import Header from "./Header"
import Ticker from "./Ticker"
import StockHistory from "./StockHistory"
import TickerSocket from "./TickerSocket"

import { toggleStock } from "../store/actions"

const AppDumb = ({ toggleStock }) => {
	return (
		<>
			<TickerSocket />
			<Router>
				<Header />
				<Container className="py-3 stock-ticker-app">
					<Switch>
						<Route exact path="/" component={ Ticker } />
						<Route path="/:symbol" children={ ({ match }) => {
							const symbol = match.params.symbol.toLowerCase()
							toggleStock(symbol)
							return <StockHistory />
						} } />
					</Switch>
				</Container>
			</Router>
		</>
	);
}

const mapDispatchToProps = { toggleStock }
const App = connect(null, mapDispatchToProps)(AppDumb)

export default App

AppDumb.propTypes = {
	toggleStock: PropTypes.func.isRequired
}