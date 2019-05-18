import { UPDATE_STOCKLIST, RESET_HISTORY, TOGGLE_STOCK, UPDATE_CONNECTION } from "./actionTypes"

export const updateStocklist = payload => ({
    type: UPDATE_STOCKLIST,
    payload
})

export const clearStockHistory = () => ({
    type: RESET_HISTORY
})

export const toggleStock = symbol => ({
    type: TOGGLE_STOCK,
    symbol
})

export const updateConnection = (status = "", message = "", hasError = false) => ({
    type: UPDATE_CONNECTION,
    payload: {
        status, message, hasError
    }
})