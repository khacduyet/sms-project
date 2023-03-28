import axiosClient from "./axiosClient.setup";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { get, post } = axiosClient;

const smarteos = `SmartEOSAPI/`

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

export const AuthServices = {
    loginUser: (data) => {
        let _payload = `username=${data.username}&password=${data.password}&grant_type=password&tokenfirebase=a`
        return post(smarteos + `oauth2/token`, _payload)
    },
    currentUser: async () => {
        let _header = await getHeaders();
        return await get(smarteos + `/QuanTri/GetCurrentUser`, _header)
    },

}