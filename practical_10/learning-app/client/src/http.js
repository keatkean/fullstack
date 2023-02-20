import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;
