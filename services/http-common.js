import axios from "axios";
import { getAccessToken } from '@/contexts/AuthContext';

const http = axios.create({
    baseURL: "http://192.168.0.73:3000/",
    headers: {
        common: {
            "Content-type": "application/json"
        }
    }
});

http.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default http;