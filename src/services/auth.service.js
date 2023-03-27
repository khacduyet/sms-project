import axiosClient from "./axiosClient.setup";
const { get, post } = axiosClient;

const smarteos = `SmartEOSAPI/`

export const AuthServices = {
    loginUser: (data) => {
        return post(`/oauth2/token`, data)
    }
}