import { returnMessage, StatusCode } from "../../common/common"

export const SUBMIT_FORM_LOGIN = "SUBMIT_FORM_LOGIN"
export const GET_TOKEN = "GET_TOKEN"
export const SET_TOKEN = "SET_TOKEN"
export const GET_CURRENT_USER = "GET_CURRENT_USER"
export const SET_CURRENT_USER = "SET_CURRENT_USER"


const initialState = {
    username: "",
    password: ""
}
const _token = {
    access_token: "",
    expires_in: 0,
    token_type: ""
}
const currentUser = {
    Id: "",
    TenNhanVien: "",
    UserName: "",
    Email: "",
}


export default function loginForReducer(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_FORM_LOGIN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export function tokenReducer(state = _token, action) {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state
            }
        case SET_TOKEN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export function userCurrenReducer(state = currentUser, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}