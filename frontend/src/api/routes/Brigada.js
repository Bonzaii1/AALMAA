import { axiosClient } from "../apiClient";

var base = "/brigada/"

export function getAll() {
    return axiosClient.get(base)
}

export function getBrigada(id) {
    return axiosClient.get(base + id)
}

export function getBrigadaActivo() {
    return axiosClient.get(base + "activo")
}

export function insertBrigada(obj) {
    return axiosClient.post(base + "insert", obj)
}

export function updateBrigada(obj) {
    return axiosClient.put(base + "update", obj)
}

export function deleteBrigada(id) {
    console.log(id)
    return axiosClient.delete(base + "delete/" + id)
}