import { combineReducers } from "redux"
import loginForReducer, { tokenReducer, userCurrenReducer } from "./loginReducer"

const reducers = combineReducers({
    login: loginForReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer
})

export default (state, action) => reducers(state, action)