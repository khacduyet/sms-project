import { QuyTrinhServices } from "../../services/danhmuc.service";
import { GET_PERSONAL } from "../reducers/personalReducer";

export const getPersonalInfomation = () => async dispatch => {
    try {
        let res = await QuyTrinhServices.ThongTinCaNhan.GetSoYeuLyLichSinhVien()
        if (res) {
            dispatch({
                type: GET_PERSONAL,
                data: res
            })
        }
    } catch (error) {
        console.log("Error: get personal error", error)
    }
}