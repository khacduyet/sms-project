import axios from 'axios';

const BEARER = "BEARER ";


const axiosClient = axios.create({
    headers: {
        Authorization:
            BEARER + _token,
    },
    baseURL: `http://103.130.212.45:1889/`,
    withCredentials: true,
});
axiosClient.interceptors.response.use(
    (res) => {
        return res.data
    },
    (er) => {
        // toast.error('Có lỗi xảy ra trong quá trình xử lý vui lòng liên hệ kỹ thuật!')
    }
);
export default axiosClient;
