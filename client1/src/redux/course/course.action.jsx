import type from './course.type';

const action = {
    addCourse: (data) => {
        return {
            type: type.ADD_COURSE,
            payload: data,
        };
    },

    addWeek: (data) => {
        return {
            type: type.ADD_WEEK,
            payload: data,
        };
    },

    addLecture: (data) => {
        return {
            type: type.ADD_LECTURE,
            payload: data,
        };
    },
};

export default action;
