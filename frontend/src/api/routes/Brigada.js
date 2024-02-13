import { axiosClient } from "../apiClient";

var base = "/brigada/"

export function getAll() {
    return axiosClient.get(base)
}

export function getBrigada(id) {
    return axiosClient.get(base + id)
}

export function insertBrigada(obj) {
    return axiosClient.post(base + "insert", obj)
}

export function deleteBrigada(id) {
    console.log(id)
    return axiosClient.delete(base + "delete/" + id)
}