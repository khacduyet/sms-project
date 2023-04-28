export const GET_PERSONAL = "GET_PERSONAL"
export const SET_PERSONAL = "SET_PERSONAL"
const _personal = {}
export function personalReducer(state = _personal, action) {
    switch (action.type) {
        case GET_PERSONAL:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
   
}
