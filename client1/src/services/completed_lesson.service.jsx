import axios from './axios.service';

const service = {
    addCompletedLesson: async (data) => {
        const response = await axios.post('/api/completed_lesson/', data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteCompletedLesson: async (lesson_id) => {
        const response = await axios.delete(`/api/participating_course/${lesson_id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
