import axios from './axios.service';

const service = {
    getCourses: async (params) => {
        const queryParams = ['Course_ID', 'Category_ID', 'User_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/course', {
            params: paramsObject,
        });

        return response.data;
    },

    getCourseDetail: async (params) => {
        const queryParams = ['Course_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/course/detail', {
            params: paramsObject,
        });

        return response.data;
    },

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
