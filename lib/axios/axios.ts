'use client';

import axios, {AxiosError} from 'axios';
import {setLoggedIn, setLoggedOut} from '../store/authSlice';
import {store} from '../store/store';
import { API_ROOT } from '@/config';


const api = axios.create({
    baseURL: `${API_ROOT}/api`,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    },

    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const {data} = await api.get('/users/refresh-token');
                const newAccessToken = data.access_token;

                store.dispatch(setLoggedIn({access_token: newAccessToken}));
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {
                const error = err as AxiosError;
                console.log(error.message);;
                store.dispatch(setLoggedOut());
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
