import type from './auth.type';
import service from '../../services/auth.service';

const action = {
    login: (data, callback) => async (dispatch) => {
        const response = await service.login(data);
        dispatch({
            type: type.LOGIN,
            payload: response.data,
        });
        callback();
    },

    logout: () => async (dispatch) => {
        await service.logout();

        dispatch({
            type: type.LOGOUT,
        });
    },
};

export default action;
