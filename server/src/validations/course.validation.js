import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] /api/course/
    get_all_courses: () => ({
        query: Joi.object({
            Course_ID: Joi.string().custom(cv.uuidv4Id),
            Name: Joi.string(),
            Category_ID: Joi.string().custom(cv.uuidv4Id),
            User_ID: Joi.string().custom(cv.uuidv4Id),
            Status: Joi.string().valid(...Object.values(label.course)),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
    // [GET] /api/course/detail
    get_course_detail: () => ({
        query: Joi.object({
            Course_ID: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/course/
    add_course: () => ({
        body: Joi.object({
            Category_ID: Joi.string()
                .required()
                .custom(cv.uuidv4Id)
                .external(cv.isCategoryExists)
                .label('Danh mục khóa học'),
            Name: Joi.string().required().label('Tên khóa học'),
            Image: Joi.any().label('Ảnh khóa học'),
            Description: Joi.string().required().label('Mô tả'),
            Level: Joi.string()
                .required()
                .valid(...Object.values(label.course_level))
                .label('Cấp độ'),
            Need_Approval: Joi.boolean().required().label('Cần xét duyệt'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/course/:id
    update_course: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Category_ID: Joi.string().custom(cv.uuidv4Id).external(cv.isCategoryExists).label('Danh mục khóa học'),
            Name: Joi.string().label('Tên khóa học'),
            Description: Joi.string().label('Mô tả'),
            Level: Joi.string()
                .valid(...Object.values(label.course_level))
                .label('Cấp độ'),
            Need_Approval: Joi.boolean().label('Cần xét duyệt'),
            Image: Joi.any().label('Ảnh khóa học'),
            Status: Joi.string()
                .valid(...Object.values(label.course))
                .label('Trạng thái khóa học'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/course/:id
    delete_course: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
