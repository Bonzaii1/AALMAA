import { axiosClient } from "../apiClient";

var base = "/"

export function verifyUser(userData) {
    return axiosClient.post(base + "login", userData)
}