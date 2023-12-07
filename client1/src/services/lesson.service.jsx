import axios from './axios.service';

const service = {
    getLesson: async (params) => {
        const queryParams = ['Lesson_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }
        const response = await axios.get('/api/lesson', { withCredentials: true, params: paramsObject });

        return response.data;
    },
};

export default service;
