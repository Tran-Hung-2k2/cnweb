import axios from './axios.service';

const userService = {
    login: async (data) =>
        (
            await axios.post('/api/auth/login', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
        ).data,

    register: async (data) => (await axios.post('/api/auth/register', data)).data,

    logout: async () => (await axios.post('/api/auth/logout')).data,
};

export default userService;
