import { combineReducers } from "redux"
import loadingReducer from "./loadingReducer"
import { tokenReducer, userCurrenReducer } from "./loginReducer"

const reducers = combineReducers({
    loading: loadingReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer,
})

export default (state, action) => reducers(state, action)