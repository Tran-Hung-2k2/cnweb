import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import custom_validation from './custom.validation';

const validation = {
    // [GET] /api/week/:id
    get_week_by_id: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(custom_validation.uuidv4Id)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/week/
    add_week: () => ({
        body: Joi.object({
            Course_ID: Joi.string()
                .required()
                .custom(custom_validation.uuidv4Id)
                .label('ID Khóa học')
                .messages({
                    ...messages,
                }),
            Title: Joi.string()
                .required()
                .label('Tiêu đề')
                .messages({
                    ...messages,
                }),
            Index: Joi.integer()
                .positive()
                .required()
                .label('Thứ tự')
                .messages({
                    ...messages,
                }),
            Description: Joi.string()
                .required()
                .label('Miêu tả')
                .messages({
                    ...messages,
                }),
            Target: Joi.string()
                .required()
                .label('Mục tiêu')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] /api/week/:id
    update_week: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(custom_validation.uuidv4Id)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
        body: Joi.object({
            Title: Joi.string()
                .label('Tiêu đề')
                .messages({
                    ...messages,
                }),
            Index: Joi.integer()
                .positive()
                .label('Thứ tự')
                .messages({
                    ...messages,
                }),
            Description: Joi.string()
                .label('Miêu tả')
                .messages({
                    ...messages,
                }),
            Target: Joi.string()
                .label('Mục tiêu')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [DELETE] /api/week/:id
    delete_week: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(custom_validation.uuidv4Id)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),
};

export default validation;
