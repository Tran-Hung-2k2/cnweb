import type from './auth.type';
import authService from '../../services/auth.service';
import notify from '../../utils/notify';

const action = {
    login: (data, callback) => async (dispatch) => {
        try {
            const response = await authService.login(data);
            dispatch({
                type: type.LOGIN,
                payload: response.data,
            });
            callback();
        } catch (error) {
            notify(error.response.data.details.body[0].message, 'error');
        }
    },

    logout: () => async (dispatch) => {
        try {
            const res = await authService.logout();
            console.log(res);
            dispatch({
                type: type.LOGOUT,
            });
        } catch (error) {
            notify(error.response.data.details.body[0].message, 'error');
        }
    },
};

export default action;
