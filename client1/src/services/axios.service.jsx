import axios from 'axios';
import notify from '../utils/notify';
import store from '../redux/store';
import type from '../redux/auth/auth.type';

const api_notify = [
    { url: '/api/auth/login', methods: ['post'] },
    { url: '/api/auth/logout', methods: ['post'] },
    { url: '/api/week', methods: ['post', 'delete'] },
];

const service = axios.create({
    baseURL: 'http://localhost:8080',
});

service.interceptors.response.use(
    (response) => {
        const config = response.config;
        const isMatched = api_notify.some((entry) => {
            return entry.url === config.url && entry.methods.includes(config.method);
        });

        if (isMatched) {
            notify(response.data.message, 'success');
        }

        return response;
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                notify(error.response.data.message, 'error');
                store.dispatch({ type: type.LOGOUT });
                break;
            default:
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((errorItem) => {
                        notify(errorItem.message, 'error');
                    });
                } else notify(error.response.data.message, 'error');
        }

        return Promise.reject(error);
    },
);

export default service;
