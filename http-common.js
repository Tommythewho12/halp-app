import axios from "axios";

export default axios.create({
    // baseURL: "http://94.114.43.121:81/api",
    baseURL: "http://192.168.0.73:3000/",
    headers: {
        "Content-type": "application/json"
    }
});
