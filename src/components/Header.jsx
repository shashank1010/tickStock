import React from 'react';
import PropTypes from "prop-types"
import { Detector } from "react-detect-offline"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import { clearStockHistory } from "../store/actions"

const HeaderDumb = ({ clearStockHistory }) => {
	return (
		<Navbar variant="dark" bg="dark" expand="lg" className="position-sticky sticky-top">
			<Navbar.Brand as={Link} to="/">Stock Ticker</Navbar.Brand>
	
			<Nav className="ml-auto">
				<Nav.Link eventKey="resetStocks" onSelect={ () => {
					clearStockHistory()
				} }>Reset Stock History</Nav.Link>
					<Detector render={({ online }) => (
						<Nav.Item className={`live-status my-n2 d-flex align-items-center justify-content-center px-3 ml-2 font-weight-bold ${online ? "bg-white text-success" : "bg-danger text-white"}`}>
							{online ? "LIVE" : "OFFLINE"}
						</Nav.Item>
					)} />
			</Nav>
		</Navbar>
	)
}



const mapDispatchToProps = { clearStockHistory }
const Header = connect(
    null,
    mapDispatchToProps
  )(HeaderDumb)

export default Header



HeaderDumb.propTypes = {
	clearStockHistory: PropTypes.func.isRequired
}