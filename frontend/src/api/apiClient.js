import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: "http://192.168.0.132:3000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})