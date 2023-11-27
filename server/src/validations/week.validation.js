import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/week/:id
    get_week_by_id: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [GET] /api/week/course/:id
    get_week_by_course_id: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id).external(cv.isCourseExists),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/week/
    add_week: () => ({
        body: Joi.object({
            Course_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID Khóa học'),
            Title: Joi.string().required().label('Tiêu đề'),
            Index: Joi.number().positive().required().label('Thứ tự'),
            Description: Joi.string().required().label('Miêu tả'),
            Target: Joi.string().required().label('Mục tiêu'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/week/:id
    update_week: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Title: Joi.string().label('Tiêu đề'),
            Index: Joi.number().positive().label('Thứ tự'),
            Description: Joi.string().label('Miêu tả'),
            Target: Joi.string().label('Mục tiêu'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/week/:id
    delete_week: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
