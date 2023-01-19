import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

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

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log(response);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response);
    if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        window.location.replace("/login");
    }
    return Promise.reject(error);
});

export default instance;
