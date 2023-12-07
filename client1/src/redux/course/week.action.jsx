import type from './course.type';
import notify from '../../utils/notify';
import service from '../../services/week.service';

const action = {
    addCourse: (data) => {
        return {
            type: type.ADD_COURSE,
            payload: data,
        };
    },

    deleteWeek: (id, callback) => async (dispatch) => {
        try {
            const response = await service.deleteWeek(id);
            dispatch({
                type: type.DELETE_WEEK,
                payload: id,
            });
            if (callback) callback();
        } catch (error) {
            notify(error.response.data.details.body[0].message, 'error');
        }
    },
};

export default action;
