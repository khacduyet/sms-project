import axiosClient from "./axiosClient.setup";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { get, post } = axiosClient;

const smarteos = `SmartEOSAPI/`
const qlsv = `QLSV`

const getHeaders = async () => {
    const sjwt = await AsyncStorage.getItem('token');
    let headers = {
        headers: {
            ContentType: "application/json;charset=UTF-8",
            Accept: "application/json, text/plain, */*",
            Authorization: ("BEARER " + sjwt)
        }
    }
    return headers;
}

export const DMGeneralServices = {
    Notification: {
        GetList: async (IdUser, IdLast) => {
            let _header = await getHeaders();
            // IdLast => scroll lazy load 
            return get(smarteos + `Notification/GetListNotificationLoaiBoLoai?Loai=abc&IdUser=${IdUser}&idIdLast=${IdLast}`, _header)
        },
        Seen: async (item) => {
            let _header = await getHeaders();
            return post(smarteos + `Notification/XemNotification`, { Item: item }, _header)
        },
    }
}

export const AuthServices = {
    loginUser: async (data) => {
        const tokenfirebase = await AsyncStorage.getItem('deviceToken');
        let _payload = `username=${data.username}&password=${data.password}&grant_type=password&tokenfirebase=${tokenfirebase}`
        return post(smarteos + `oauth2/token`, _payload)
    },
    currentUser: async () => {
        let _header = await getHeaders();
        return await get(smarteos + `/QuanTri/GetCurrentUser`, _header)
    },
    changePassword: async (data) => {
        let _header = await getHeaders();
        return await post(smarteos + `/QuanTri/ChangePass`, data, _header)
    },
    ResetForgotPasswordNoLogin: (data) => {
        return post(smarteos + `/QuanTri/ResetForgotPasswordNoLogin`, data)
    },
}
