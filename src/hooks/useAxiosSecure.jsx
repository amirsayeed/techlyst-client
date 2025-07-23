import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://techlyst-server.vercel.app'
});

const useAxiosSecure = () => {
    const {user, logOut} = useAuth();
    const navigate = useNavigate();
    
      useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
        }, error => Promise.reject(error));

        const responseInterceptor = axiosSecure.interceptors.response.use(
        res => res,
        async error => {
            const status = error.response?.status;
            if (status === 401) {
            await logOut();
            navigate('/login');
            } else if (status === 403) {
            navigate('/forbidden');
            }
            return Promise.reject(error);
        }
        );

        return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;