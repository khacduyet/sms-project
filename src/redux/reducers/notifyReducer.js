

export const GET_NOTIFY = "GET_NOTIFY"
export const SET_NOTIFY = "SET_NOTIFY"
export const LOAD_MORE_NOTIFY = "LOAD_MORE_NOTIFY"

const _notifies = []

export function notifyReducer(state = _notifies, action) {
    switch (action.type) {
        case GET_NOTIFY:
            return state;
        case SET_NOTIFY:
            return;
        case LOAD_MORE_NOTIFY:
            return [...action.data];
        default:
            return state;
    }
}