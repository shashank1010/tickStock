import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Alert from "react-bootstrap/Alert"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown"
import { Sparklines, SparklinesCurve, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import { Link } from "react-router-dom"

import { number } from "../utils/presentation"

const StockNoDataInfo = ({ symbol }) => (
	<Alert variant="info">
		<Alert.Heading>Something seems to be wrong! We have no history found for <strong>{ symbol }</strong></Alert.Heading>
		<p>
			Well, this is embarrassing! Probably you are here too early, or the symbol is invalid.<br />
			Give it some time, if the symbol is valid the it's history will show up here.
		</p>
		<hr />
		<p className="mb-0">
			Feel free to navigate <Alert.Link as={Link} to="/">back to the list</Alert.Link> and pick a symbol to view its history
		</p>
	</Alert>
)

class StockHistoryDumb extends React.Component {
	render() {
		const { stockList, symbol } = this.props
		const stock = stockList[symbol] || null
		const symbolLabel = symbol.toUpperCase()
		const otherStocks = Object.keys(stockList).filter(stockSymbol => stockSymbol !== symbol)

		if(stock === null)
			return <StockNoDataInfo symbol={ symbolLabel } />

		const history = [...stock.history].reverse()
		const data = history.map(({ price }) => price)

		const sparkProps = {
				data: data,
				width: 100,
				height: 20,
				limit: 40,
				margin: 1,
		}
		return (
			<>
				<h1>
					Ticker Symbol:
					
					<Dropdown as="span" className="d-inline-block ml-1">
						<Dropdown.Toggle as="strong" variant="link" id="stick-list-dropdown">
							{ symbolLabel }
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{
								otherStocks.map((symbol) => (
									<Dropdown.Item key={ symbol } as={ Link } to={`/${symbol}`}>{ symbol.toUpperCase() }</Dropdown.Item>
								))
							}
						</Dropdown.Menu>
					</Dropdown>
				</h1>

				{
					data.length > 1
					? (
						<div className="my-3" >
							<Sparklines { ...sparkProps }>
								<SparklinesCurve color="#41c3f9" style={{ fill: "lightslategray" }} />
								<SparklinesSpots size={1} spotColors={{ '0': 'white', '-1': 'red', '1': 'green' }} />
								<SparklinesReferenceLine type="mean" />
							</Sparklines>
						</div>
					)
					: (
						<Alert variant="info" className="text-center">
							Graph will be load here when more data is available.
						</Alert>
					)
				}

				<Table striped bordered hover size="sm" className="m-0">
						<thead>
								<tr>
										<th style={{ width: "5ch" }}></th>
										<th>Price</th>
										<th>Difference</th>
										<th>Date</th>
										<th>Time</th>
								</tr>
						</thead>
						<tbody>
							{
								history.map(({price, timeStamp}, i, self) => {
									const [date, time] = (new Date(timeStamp)).toLocaleString().split(',')
									const isLastItem = i + 1 === history.length
									const difference = !isLastItem && history[i+1].price - price
									const absoluteDiff = isLastItem ? '-' : number.format(Math.abs(difference))
									const className = isLastItem ? "" : difference > 0 ? "danger" : "success"
									return (
										<tr key={i}>
											<td>{ self.length - i }</td>
											<td>{ number.format(price) }</td>
											<td className={ className && `text-${className}` }>{ absoluteDiff }</td>
											<td>{ date }</td>
											<td>{ time }</td>
										</tr>
									)
								})
							}
						</tbody>
				</Table>
			</>
		)
	}
}

const mapStateToProps = ({ stockListReducer: { symbol, stockList } }) => {
	return { symbol, stockList }
}
const StockHistory = connect(mapStateToProps)(StockHistoryDumb)

export default StockHistory

StockHistoryDumb.propTypes = {
	symbol: PropTypes.string.isRequired,
	stockList: PropTypes.objectOf(
		PropTypes.shape({
				price: PropTypes.number.isRequired,
				history: PropTypes.arrayOf(PropTypes.shape({
						price: PropTypes.number.isRequired,
						timeStamp: PropTypes.number.isRequired
				})).isRequired
		})
	).isRequired
}