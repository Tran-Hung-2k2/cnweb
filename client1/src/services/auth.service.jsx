import axios from './axios.service';

const service = {
    login: async (data) =>
        (
            await axios.post('/api/auth/login', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
        ).data,

    register: async (data) => (await axios.post('/api/auth/register', data)).data,

    refresh_token: async () => (
        await axios.post('/api/auth/refresh_token'),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    ),

    logout: async () => await axios.post('/api/auth/logout'),
};

export default service;
