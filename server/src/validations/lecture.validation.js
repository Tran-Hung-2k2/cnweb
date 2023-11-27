import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/lecture/:id
    get_lecture_by_id: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [GET] /api/lecture/week/:id
    get_lecture_by_week_id: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .external(cv.isWeekExists)
                .label('Tuần học')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [POST] /api/lecture/
    add_lecture: () => ({
        body: Joi.object({
            Week_ID: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .label('ID tuần học')
                .messages({
                    ...messages,
                }),
            Lecture_Title: Joi.string()
                .required()
                .label('Tiêu đề')
                .messages({
                    ...messages,
                }),
            Index: Joi.number()
                .positive()
                .required()
                .label('Thứ tự')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] /api/lecture/:id
    update_lecture: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
        body: Joi.object({
            Lecture_Title: Joi.string()
                .label('Tiêu đề')
                .messages({
                    ...messages,
                }),
            Index: Joi.number()
                .positive()
                .label('Thứ tự')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [DELETE] /api/lecture/:id
    delete_lecture: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
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
