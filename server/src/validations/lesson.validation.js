import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] /api/lesson/
    get_all_lessons: () => ({
        query: Joi.object({
            Lecture_ID: Joi.string().custom(cv.uuidv4Id),
            Lesson_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/lesson/
    add_lesson: () => ({
        body: Joi.object({
            Lecture_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID bài giảng'),
            Title: Joi.string().required().label('Tiêu đề'),
            Type: Joi.string()
                .required()
                .valid(...Object.values(label.lesson_type))
                .label('Loại bài học'),
            Index: Joi.number().positive().required().label('Thứ tự'),
            Duration: Joi.number().positive().required().label('Thời lượng'),
            Content: Joi.string().label('Nội dung'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/lesson/:id
    update_lesson: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Lecture_ID: Joi.string().custom(cv.uuidv4Id).label('ID bài giảng'),
            Title: Joi.string().label('Tiêu đề'),
            Index: Joi.number().positive().label('Thứ tự'),
            Type: Joi.string()
                .valid(...Object.values(label.lesson_type))
                .label('Loại bài học'),
            Duration: Joi.number().positive().label('Thời lượng'),
            Content: Joi.string().label('Nội dung'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/lesson/:id
    delete_lesson: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
