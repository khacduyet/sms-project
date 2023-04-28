import { combineReducers } from "redux"
import loadingReducer from "./loadingReducer"
import { tokenReducer, userCurrenReducer } from "./loginReducer"
import { notifyReducer } from "./notifyReducer"
import { personalReducer } from "./personalReducer"

const reducers = combineReducers({
    loading: loadingReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer,
    notify: notifyReducer,
    personal: personalReducer,
})

export default (state, action) => reducers(state, action)