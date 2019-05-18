import { combineReducers } from "redux";
import { UPDATE_STOCKLIST, TOGGLE_STOCK, RESET_HISTORY, UPDATE_CONNECTION } from "./actionTypes"

const initialState = {
    stockList: {},
    symbol: null,
    reset: false,
    connectionState: {
        status: "",
        message: "",
        hasError: false
    }
}
	
function updateStocks({ data }, currentList) {
    const newStocks = JSON.parse(data)
    const timeStamp = Date.now()

    const stockList = currentList

    newStocks.forEach(([symbol, value]) => {
        const price = +value
        if(currentList[symbol]){ 
            currentList[symbol].price = price
            currentList[symbol].history.push({ price, timeStamp })
        } else {
            currentList[symbol] = { price, history: [{ price, timeStamp }] }
        }
    })

    return stockList
}

const stockListReducer  = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_STOCKLIST:
            return { ...state, stockList: updateStocks(action.payload, { ...state.stockList }), reset: false }
        case RESET_HISTORY: 
            return { ...state, stockList: {}, reset: true }
        case TOGGLE_STOCK:
            return {
                ...state, symbol: action.symbol
            }
        default:
            return state;
    }
}

const connectionStateReducer = (state = initialState.connectionState, action) => {
    switch (action.type){
        case UPDATE_CONNECTION:
            return { ...state, ...action.payload } 
        default:
        return state
    }
}

export default combineReducers({ stockListReducer, connectionStateReducer });