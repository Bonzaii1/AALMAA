import { axiosClient } from "../apiClient";

var base = "/paciente/"

export function getAll() {
    return axiosClient.get(base)
}

export function getOne(id) {
    return axiosClient.get(base + id)
}