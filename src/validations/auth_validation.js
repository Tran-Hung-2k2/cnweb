import { Joi } from 'express-validation';
import messages from '../utils/validation_message';

const auth_validation = {
    // [POST] /api/auth/register/
    register: () => ({
        body: Joi.object({
            User_Name: Joi.string()
                .trim()
                .min(1)
                .required()
                .label('Tên người dùng')
                .messages({
                    ...messages,
                }),
            Email: Joi.string()
                .email()
                .required()
                .messages({
                    ...messages,
                }),
            User_Password: Joi.string()
                .required()
                .label('Mật khẩu')
                .messages({
                    ...messages,
                }),
            Gender: Joi.string()
                .valid('Nam', 'Nữ', 'Khác')
                .label('Giới tính')
                .messages({
                    ...messages,
                }),
            Birthday: Joi.date()
                .label('Ngày sinh')
                .messages({
                    ...messages,
                }),
            Phone_Number: Joi.string()
                .label('Số điện thoại')
                .messages({
                    ...messages,
                }),
            Address: Joi.string()
                .label('Địa chỉ')
                .messages({
                    ...messages,
                }),
        }).unknown(true),
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
            User_Password: Joi.string()
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
            New_Password: Joi.string()
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
        }),
    }),

    // [POST] /api/auth/forget_password/
    forget_password: () => ({
        body: Joi.object({
            Email: Joi.string()
                .email()
                .required()
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

export default auth_validation;
