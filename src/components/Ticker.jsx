import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import Table from "react-bootstrap/Table"
import Alert from "react-bootstrap/Alert"

import TickerRow from "./TickerRow"

const CustomAlert = ({ variant, icon, message, children }) => (
    <Alert variant={variant} className="rounded-bottom text-center border-0 rounded-top-0 loader d-flex align-items-center justify-content-center flex-column">
        {
            icon && <img src={`./${icon}.svg`} alt={ icon } />
        }
        <div className="mt-3">
            {
                message || children
            }
        </div>
    </Alert>
)


const ConnectionError = ({connection}) => (
    <CustomAlert variant="danger" icon="error" message={ connection.message } />
)

const LoadingDataInfo = ({ message }) => (
    <CustomAlert variant="dark" icon="loader" message={message} />
)


const TickerDumb = ({ stockList, reset, connection }) => {
    const stockListKeys = Object.keys(stockList).sort()
    const currentTime = Date.now()

    if(connection.hasError)
        return <ConnectionError connection={ connection } />

    if(stockListKeys.length === 0){
        const message = !reset ? "Fetching Stocks" : <span>Stock data has been flushed.<br />Fresh data will be loaded soon.</span>
        return <LoadingDataInfo message={ message }  connetion={ connection } />
    }

    return (
        <>
            <Table striped bordered hover size="sm" className="m-0">
                <thead>
                    <tr>
                        <th style={{ width: '10ch' }}>Code</th>
                        <th style={{ width: '10ch' }}>Price</th>
                        <th style={{ width: "15ch" }}>Last Updated At</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stockListKeys.length > 0 &&
                        stockListKeys.map((symbol) => (
                            <TickerRow
                                key={ symbol }
                                symbol={ symbol }
                                stock={ stockList[symbol] }
                                currentTime = { currentTime }
                                />
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = ({ stockListReducer: { stockList, reset}, connectionStateReducer }) => {
    return ({ stockList, reset, connection: { ...connectionStateReducer } })
}
// const mapDispatchToProps = { clearStockHistory }

const Ticker = connect(mapStateToProps)(TickerDumb)


export default Ticker

TickerDumb.propTypes = {
    stockList: PropTypes.objectOf(
        PropTypes.shape({
            price: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(PropTypes.shape({
                price: PropTypes.number.isRequired,
                timeStamp: PropTypes.number.isRequired
            })).isRequired
        })
    ).isRequired,
    connection: PropTypes.shape({
        status: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        hasError: PropTypes.bool.isRequired
    }).isRequired
}