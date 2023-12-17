import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [POST] /api/completed_lesson/
    add_completed_lesson: () => ({
        body: Joi.object({
            Lesson_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID tiết học'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/completed_lesson/:id
    delete_completed_lesson: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
