import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { returnMessage, StatusCode } from '../common/common';
import { BASE_URL } from '../common/constant';


const axiosClient = axios.create({
    headers: {
        ContentType: "application/json;charset=UTF-8",
        Accept: "application/json, text/plain, */*"
    },
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 30000,
});
axiosClient.interceptors.response.use(
    (res) => {
        return res.data
    },
    (er) => {
        let _msg = returnMessage(StatusCode.CONTACT_DEV)
        ToastAndroid.show(_msg, ToastAndroid.SHORT);
    }
);
export default axiosClient;
