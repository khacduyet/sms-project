import { SUBMIT_FORM } from "../reducers/loginReducer";


export const loginSubmit = (data) => async dispatch => {
    try {
        dispatch({
            type: SUBMIT_FORM,
            data: data
        })
    } catch (error) {
        console.log("error: function");
    }
}