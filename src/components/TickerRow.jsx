import React from "react"
import PropTypes from "prop-types"
import Timeago from "react-timeago"
import { Link } from "react-router-dom"
import { Sparklines, SparklinesCurve, SparklinesSpots, SparklinesBars } from 'react-sparklines';

import { number } from "../utils/presentation"

const TickerRow = ({ symbol, stock, currentTime }) => {
    const { price, history } = stock
    const [ oldCost, newCost ] = history.slice(history.length - 2)
    const hasAppreciation = newCost ? oldCost.price < newCost.price : null
    const data = history.map(({ price }) => price)
    const sparkProps = {
        data,
        height: 15,
        limit: 25,
        margin: 1
    }
    return (
        <tr className="vert">
            <td className="align-middle">
                <Link to={ `/${symbol}` }><strong>{ symbol.toUpperCase() }</strong></Link>
            </td>
            <td className={`align-middle text-${ hasAppreciation === null ? "" : hasAppreciation === false ? 'danger' : 'success'}`}>{ number.format(price) }</td>
            <td className="align-middle">
                <Timeago date={ (newCost || oldCost).timeStamp } />
            </td>
            <td className="align-middle p-0">
                <Sparklines { ...sparkProps }>
                    <SparklinesBars style={{ fill: '#41c3f9', opacity: 0.3 }} />
                    <SparklinesCurve color="#41c3f9" style={{ fill: "none" }} />
                    <SparklinesSpots size={1} spotColors={{ '0': 'white', '-1': 'red', '1': 'green' }} />
                </Sparklines>
            </td>
        </tr>
    )
}

export default TickerRow

TickerRow.propTypes = {
    currentTime: PropTypes.number,
    symbol: PropTypes.string.isRequired,
    stock: PropTypes.shape({
        price: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(PropTypes.shape({
            price: PropTypes.number.isRequired,
            timeStamp: PropTypes.number
        })).isRequired
    }).isRequired
}

TickerRow.defaultProp = {
    currentTime: Date.now()
}