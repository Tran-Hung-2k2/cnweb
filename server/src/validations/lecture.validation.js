import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/lecture/
    get_all_lectures: () => ({
        query: Joi.object({
            Lecture_ID: Joi.string().custom(cv.uuidv4Id),
            Week_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/lecture/
    add_lecture: () => ({
        body: Joi.object({
            Week_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID tuần học'),
            Lecture_Title: Joi.string().required().label('Tiêu đề'),
            Index: Joi.number().positive().required().label('Thứ tự'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/lecture/:id
    update_lecture: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Week_ID: Joi.string().custom(cv.uuidv4Id).label('ID tuần học'),
            Lecture_Title: Joi.string().label('Tiêu đề'),
            Index: Joi.number().positive().label('Thứ tự'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/lecture/:id
    delete_lecture: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
