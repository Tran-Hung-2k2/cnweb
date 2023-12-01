import type from './auth.type';
import authService from '../../services/auth.service';
import notify from '../../utils/notify';

const action = {
    login: (data, callback) => {
        return async (dispatch) => {
            try {
                const response = await authService.login(data);
                dispatch({
                    type: type.LOGIN,
                    payload: response.data.data,
                });
                callback();
            } catch (error) {
                notify(error.response.data.details.body[0].message, 'error');
            }
        };
    },

    logout: () => {
        return {
            type: type.LOGOUT,
        };
    },
};
export default action;
