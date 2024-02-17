import { axiosClient } from "../apiClient";

var base = "/paciente/"

export function getAll() {
    return axiosClient.get(base)
}

export function getOne(id) {
    return axiosClient.get(base + id)
}

export function getNumPatients(id) {
    return axiosClient.get(base + "num/" + id)
}

export function addOne(obj) {
    return axiosClient.post(base + "insert", obj)
}

export function updateOne(obj) {
    return axiosClient.put(base + "update", obj)
}

export function deleteOne(id) {
    return axiosClient.delete(base + "delete/" + id)
}

export function testCall(obj) {
    return axiosClient.put(base + "test", obj)
}