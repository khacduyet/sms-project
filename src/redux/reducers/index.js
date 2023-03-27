import { combineReducers } from "redux"
import loginForReducer from "./loginReducer"

const reducers = combineReducers({
    login: loginForReducer
})

export default (state, action) => reducers(state, action)