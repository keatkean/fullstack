import axios from "axios";
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './contexts/UserContext';

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

const ResponseInterceptor = ({ children }) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        // Add a response interceptor
        const interceptor = instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            //console.log(response);
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log(error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("logout...");
                localStorage.clear();
                setUser(null);
                //navigate("/login");
            }
            return Promise.reject(error);
        });

        return () => instance.interceptors.response.eject(interceptor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return children;
};

export default instance;
export { ResponseInterceptor };
