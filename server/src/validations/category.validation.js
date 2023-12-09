import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/category/
    get_all_categories: () => ({
        query: Joi.object({
            Category_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/category/
    add_category: () => ({
        body: Joi.object({
            Name: Joi.string().required().external(cv.isCategoryNameNotExists).label('Tên danh mục'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/category/:id
    update_category: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Name: Joi.string().required().external(cv.isCategoryNameNotExists).label('Tên danh mục'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/category/:id
    delete_category: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
