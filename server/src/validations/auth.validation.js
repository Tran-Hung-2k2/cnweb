import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [POST] /api/auth/register/
    register: () => ({
        body: Joi.object({
            Name: Joi.string()
                .trim()
                .required()
                .label('Tên người dùng')
                .messages({
                    ...messages,
                }),
            Email: Joi.string()
                .email()
                .required()
                .external(cv.isNotRegistered)
                .messages({
                    ...messages,
                }),
            Password: Joi.string()
                .required()
                .label('Mật khẩu')
                .messages({
                    ...messages,
                }),
            Confirm_Password: Joi.string()
                .required()
                .label('Mật khẩu xác nhận')
                .messages({
                    ...messages,
                }),
            Role: Joi.string()
                .required()
                .valid(...Object.values(label.role))
                .label('Vai trò')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/auth/login/
    login: () => ({
        body: Joi.object({
            Email: Joi.string()
                .email()
                .required()
                .messages({
                    ...messages,
                }),
            Password: Joi.string()
                .required()
                .label('Mật khẩu')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/auth/change_password/
    change_password: () => ({
        body: Joi.object({
            Email: Joi.string()
                .email()
                .required()
                .messages({
                    ...messages,
                }),
            Old_Password: Joi.string()
                .required()
                .label('Mật khẩu')
                .messages({
                    ...messages,
                }),
            Password: Joi.string()
                .required()
                .label('Mật khẩu mới')
                .messages({
                    ...messages,
                }),
            Confirm_Password: Joi.string()
                .required()
                .label('Mật khẩu xác nhận')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/auth/forget_password/
    forget_password: () => ({
        body: Joi.object({
            Email: Joi.string()
                .email()
                .required()
                .external(cv.isRegistered)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: () => ({
        cookies: Joi.object({
            refresh_token: Joi.string()
                .required()
                .messages({
                    ...messages,
                }),
        }).unknown(true),
    }),
};

export default validation;
