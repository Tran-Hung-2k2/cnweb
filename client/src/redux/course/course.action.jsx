import type from './course.type';
import service from '../../services/course.service';

const action = {
    setCourse: (course_id, user_id, callback) => async (dispatch) => {
        const requestData = { Course_ID: course_id };

        if (user_id) {
            requestData.User_ID = user_id;
        }

        const response = await service.getCourseDetail(requestData);
        dispatch({
            type: type.SET_COURSE,
            payload: response.data,
        });
        if (callback) callback(response.data);
    },

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
