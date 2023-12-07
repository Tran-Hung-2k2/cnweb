import axios from './axios.service';

const service = {
    addWeek: async (data) => {
        const response = await axios.post('/api/week', JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        return response.data;
    },

    deleteWeek: async (id) => {
        const response = await axios.delete(`/api/week/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
