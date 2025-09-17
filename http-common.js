import axios from "axios";
import { getAccessToken } from "./contexts/AuthContext";

// export default axios.create({
//     // baseURL: "http://94.114.43.121:81/api",
//     baseURL: "http://192.168.0.73:3000/",
//     headers: {
//         common: {
//             "Content-type": "application/json"
//         }
//     }
// });

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