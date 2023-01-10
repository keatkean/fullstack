import axios from 'axios';

function setupAxios() {
    axios.defaults.baseURL = "http://localhost:3001";

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        let accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        //console.log(response);
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        //console.log(error);
        return Promise.reject(error);
    });
}

export default setupAxios;