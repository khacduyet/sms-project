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
        if (er.response.status === 400) {
            let _msg = returnMessage(StatusCode.ERROR_USER)
            ToastAndroid.show(_msg, ToastAndroid.SHORT);
            return;
        }
        let _msg = returnMessage(StatusCode.CONTACT_DEV)
        ToastAndroid.show(_msg, ToastAndroid.SHORT);
    }
);
export default axiosClient;
