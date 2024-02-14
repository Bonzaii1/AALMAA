import { axiosClient } from "../apiClient";

var base = "/paciente/"

export function getAll() {
    return axiosClient.get(base)
}