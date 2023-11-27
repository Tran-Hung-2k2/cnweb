import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] /api/course/:id
    get_course_by_id: () => ({
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

    // [POST] /api/course/
    add_course: () => ({
        body: Joi.object({
            Category_ID: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .external(cv.isCategoryExists)
                .label('Danh mục khóa học')
                .messages({
                    ...messages,
                }),
            Name: Joi.string()
                .required()
                .label('Tên khóa học')
                .messages({
                    ...messages,
                }),
            Description: Joi.string()
                .required()
                .label('Mô tả')
                .messages({
                    ...messages,
                }),
            Level: Joi.string()
                .required()
                .valid(...Object.values(label.course_level))
                .label('Cấp độ')
                .messages({
                    ...messages,
                }),
            Need_Approval: Joi.boolean()
                .required()
                .label('Cần xét duyệt')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] /api/course/:id
    update_course: () => ({
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
            Category_ID: Joi.string()
                .custom(cv.uuidv4Id)
                .external(cv.isCategoryExists)
                .label('Danh mục khóa học')
                .messages({
                    ...messages,
                }),
            Name: Joi.string()
                .label('Tên khóa học')
                .messages({
                    ...messages,
                }),
            Description: Joi.string()
                .label('Mô tả')
                .messages({
                    ...messages,
                }),
            Level: Joi.string()
                .valid(...Object.values(label.course_level))
                .label('Cấp độ')
                .messages({
                    ...messages,
                }),
            Need_Approval: Joi.boolean()
                .label('Cần xét duyệt')
                .messages({
                    ...messages,
                }),
            Status: Joi.string()
                .valid(...Object.values(label.course))
                .label('Trạng thái khóa học')
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [DELETE] /api/course/:id
    delete_course: () => ({
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
