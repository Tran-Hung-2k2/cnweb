import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import custom_validation from './custom.validation';

const validation = {
    // [GET] /api/category/:id
    get_category_by_id: () => ({
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

    // [POST] /api/category/
    add_category: () => ({
        body: Joi.object({
            Name: Joi.string()
                .required()
                .external(custom_validation.isCategoryNameExists)
                .label('Tên danh mục')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] /api/category/:id
    update_category: () => ({
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
            Name: Joi.string()
                .required()
                .external(custom_validation.isCategoryNameExists)
                .label('Tên danh mục')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [DELETE] /api/category/:id
    delete_category: () => ({
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
