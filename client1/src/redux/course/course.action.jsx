import type from './course.type';
import notify from '../../utils/notify';
import service from '../../services/course.service';

const action = {
    setCourse: (id, callback) => async (dispatch) => {
        try {
            const response = await service.getCourseDetail({ Course_ID: id });
            dispatch({
                type: type.SET_COURSE,
                payload: response.data,
            });
            if (callback) callback(response.data);
        } catch (error) {
            notify(error.response.data.details.body[0].message, 'error');
        }
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
