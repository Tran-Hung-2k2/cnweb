import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [POST] /api/auth/register/
    register: () => ({
        body: Joi.object({
            Name: Joi.string().trim().required().label('Tên người dùng'),
            Email: Joi.string().email().required().external(cv.isNotRegistered),
            Password: Joi.string().required().label('Mật khẩu'),
            Confirm_Password: Joi.string().required().label('Mật khẩu xác nhận'),
            Role: Joi.string()
                .required()
                .valid(...Object.values(label.role))
                .label('Vai trò'),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/login/
    login: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Password: Joi.string().required().label('Mật khẩu'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/change_password/
    change_password: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Old_Password: Joi.string().required().label('Mật khẩu'),
            Password: Joi.string().required().label('Mật khẩu mới'),
            Confirm_Password: Joi.string().required().label('Mật khẩu xác nhận'),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/forget_password/
    forget_password: () => ({
        body: Joi.object({
            Email: Joi.string().email().required().external(cv.isRegistered),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: () => ({
        cookies: Joi.object({
            refresh_token: Joi.string().required(),
        })
            .unknown(true)
            .prefs({ messages }),
    }),
};

export default validation;
