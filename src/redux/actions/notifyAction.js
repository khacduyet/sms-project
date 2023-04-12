import { DMGeneralServices } from "../../services/danhmuc.service";
import { LOAD_MORE_NOTIFY } from "../reducers/notifyReducer"

export const getListNotify = (IdUser, IdLast) => async dispatch => {
    try {
        let res = await DMGeneralServices.Notification.GetList(IdUser, IdLast)
        if (res) {
            dispatch({
                type: LOAD_MORE_NOTIFY,
                data: res.ListItem
            })
        }
    } catch (error) {
        console.log("Error: get notify error", error)
    }
}