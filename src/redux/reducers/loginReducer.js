
export const SUBMIT_FORM = "SUBMIT_FORM"
export const GET_TOKEN = "GET_TOKEN"


const initialState = {
    username: null,
    password: null,
    grant_type: `password`,
    tokenfirebase: `a`
}


export default function loginForReducer(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_FORM:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}