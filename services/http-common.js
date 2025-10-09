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
    async (config) => {
        if (config.url && config.url.startsWith('auth')) {
            const token = await getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

http.interceptors.response.use(undefined, async (error) => {
    console.debug('error server response', error);
    if (error.response?.status === 401) {
        console.warn('unauthorized access signaled by server');
        // using 'return' retries to fire the original request
        // return http(error.config);
    }
    throw error;
});

export default http;