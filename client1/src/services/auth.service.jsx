import axiosService from './axios.service';

const userService = {
    login: async (data) => {
        return await axiosService.post('/api/auth/login', JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
    },
    register: async (data) => {
        return await axiosService.post('/api/auth/register', data);
    },
    logout: async () => {
        return await axiosService.post('/api/auth/logout');
    },
};

export default userService;
