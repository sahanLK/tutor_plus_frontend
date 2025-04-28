'use client';

import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await api.get('/users/refresh-token');
                const newAccessToken = res.data.access_token;
                
                localStorage.setItem('access_token', newAccessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                console.log('Token refresh failed');
                localStorage.removeItem('access_token');
            }
        }

        return Promise.reject(error);
    }
);

export default api;
