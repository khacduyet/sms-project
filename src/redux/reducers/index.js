import { combineReducers } from "redux"
import loadingReducer from "./loadingReducer"
import loginForReducer, { tokenReducer, userCurrenReducer } from "./loginReducer"

const reducers = combineReducers({
    loading: loadingReducer,
    login: loginForReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer,
})

export default (state, action) => reducers(state, action)