import axios from 'axios';
import store from '../redux/store';
import type from '../redux/auth/auth.type';
import notify from '../utils/notify';

const api_notify = [
    { url: '/api/auth/login', methods: ['post'] },
    { url: '/api/auth/logout', methods: ['post'] },
    { url: '/api/course', methods: ['post', 'patch', 'delete'] },
    { url: '/api/week', methods: ['post', 'patch', 'delete'] },
    { url: '/api/category', methods: ['post', 'patch', 'delete'] },
    { url: '/api/lecture', methods: ['post', 'patch', 'delete'] },
    { url: '/api/lesson', methods: ['post', 'patch', 'delete'] },
    { url: '/api/user', methods: ['post', 'patch', 'delete'] },
];

const service = axios.create({
    baseURL: 'http://localhost:8080',
});

service.interceptors.response.use(
    (response) => {
        const config = response.config;
        const isMatched = api_notify.some((entry) => {
            return config.url.startsWith(entry.url) && entry.methods.includes(config.method);
        });

        if (isMatched) {
            notify(response.data.message, 'success');
        }

        return response;
    },
    (error) => {
        if (error.code == 'ERR_NETWORK') notify('Không thể kết nối tới máy chủ. Vui lòng thử lại sau', 'error');
        else
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