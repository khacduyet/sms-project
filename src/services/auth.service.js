import axiosClient from "./axiosClient.setup";
const { get, post } = axiosClient;

export const AuthServices = {
    loginUser: (data) => {
        return post(``, data)
    }
}