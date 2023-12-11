import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] api/participating_course/
    get_all_participating_courses: () => ({
        query: Joi.object({
            Status: Joi.string()
                .trim()
                .valid(...Object.values(label.parti_course))
                .label('Trạng thái đăng ký khóa học'),
            Course_ID: Joi.string().custom(cv.uuidv4Id),
            User_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/participating_course/
    add_participating_course: () => ({
        body: Joi.object({
            Course_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID Khóa học'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/participating_course/:course_id
    update_participating_course: () => ({
        params: Joi.object({
            course_id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Review_Content: Joi.string().required().label('Nội dung đánh giá'),
            Review_Star: Joi.number().positive().required().label('Số sao đánh giá'),
            Date_Achieved: Joi.date().required().label('Ngày hoàn thành khóa học'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/participating_course/status/:user_id/:course_id
    update_participating_course_status: () => ({
        params: Joi.object({
            user_id: Joi.string().required().custom(cv.uuidv4Id),
            course_id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Status: Joi.string()
                .valid(...Object.values(label.parti_course))
                .label('Trạng thái đăng ký khóa học'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/participating_course/:user_id/:course_id
    delete_participating_course: () => ({
        params: Joi.object({
            user_id: Joi.string().required().custom(cv.uuidv4Id),
            course_id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
