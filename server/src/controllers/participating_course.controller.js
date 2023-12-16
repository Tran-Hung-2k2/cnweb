import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';
import label from '../constants/label.js';

const controller = {
    // [GET] /api/participating_course/
    get_all_participating_courses: async_wrap(async (req, res) => {
        const queryParams = ['User_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const participating_courses = await db.Participating_Course.findAll({
            where: whereClause,
            include: [
                {
                    model: db.User,
                    attributes: ['User_ID', 'Name', 'Avatar', 'Status', 'Role', 'createdAt', 'updatedAt'],
                },
                {
                    model: db.Course,
                },
            ],
        });

        if (participating_courses.length > 0)
            return res
                .status(200)
                .json(
                    api_response(false, 'Lấy danh sách thông tin đăng ký khóa học thành công', participating_courses),
                );
        else
            return res
                .status(200)
                .json(api_response(false, 'Không tìm thấy thông tin đăng ký khóa học nào', participating_courses));
    }),

    // [GET] /api/participating_course/org/
    get_participating_courses_org: async_wrap(async (req, res) => {
        const participating_courses = await db.User.findByPk(req.token.id, {
            attributes: ['User_ID', 'Name', 'Avatar', 'Status', 'Role', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: db.Course,
                    include: [
                        {
                            model: db.Participating_Course,
                            include: [
                                {
                                    model: db.User,
                                    attributes: [
                                        'User_ID',
                                        'Email',
                                        'Name',
                                        'Avatar',
                                        'Status',
                                        'Role',
                                        'createdAt',
                                        'updatedAt',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (participating_courses.length > 0)
            return res
                .status(200)
                .json(
                    api_response(false, 'Lấy danh sách thông tin đăng ký khóa học thành công', participating_courses),
                );
        else
            return res
                .status(200)
                .json(api_response(false, 'Không tìm thấy thông tin đăng ký khóa học nào', participating_courses));
    }),

    // [POST] /api/participating_course/
    add_participating_course: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.body.Course_ID);
        if (!course) throw new APIError(404, 'Khóa học không tồn tại');

        const articipating_course = await db.Participating_Course.create({
            ...req.body,
            Status: course.Need_Approval ? label.parti_course.PENDING_APPROVAL : label.parti_course.NOT_COMPLETED,
            User_ID: req.token.id,
        });
        return res.status(201).json(api_response(false, 'Đăng ký khóa học thành công', articipating_course));
    }),

    // [PATCH] /api/participating_course/:course_id
    update_participating_course: async_wrap(async (req, res) => {
        const participating_course = await db.Participating_Course.findOne({
            where: {
                User_ID: req.token.id,
                Course_ID: req.params.course_id,
            },
        });

        if (!participating_course) throw new APIError(404, 'Thông tin đăng ký khóa học này không tồn tại');

        participating_course.Review_Content = req.body.Review_Content || participating_course.Review_Content;
        participating_course.Review_Star = req.body.Review_Star || participating_course.Review_Star;
        participating_course.Date_Achieved = req.body.Date_Achieved || participating_course.Date_Achieved;

        await participating_course.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin đăng ký khóa học thành công'));
    }),

    // [PATCH] /api/participating_course/status/:user_id/:course_id
    update_participating_course_status: async_wrap(async (req, res) => {
        const participating_course = await db.Participating_Course.findOne({
            where: {
                User_ID: req.params.user_id,
                Course_ID: req.params.course_id,
            },
        });

        if (!participating_course) throw new APIError(404, 'Thông tin đăng ký khóa học này không tồn tại');

        participating_course.Status = req.body.Status || participating_course.Status;

        await participating_course.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin đăng ký khóa học thành công'));
    }),

    // [DELETE] /api/participating_course/:user_id/:course_id
    delete_participating_course: async_wrap(async (req, res) => {
        const result = await db.Participating_Course.destroy({
            where: {
                User_ID: req.params.user_id,
                Course_ID: req.params.course_id,
            },
        });

        if (result === 1) {
            return res.status(200).json(api_response(false, 'Xóa thông tin đăng ký khóa học thành công'));
        } else {
            throw new APIError(404, 'Không tìm thấy thông tin đăng ký khóa học');
        }
    }),
};

export default controller;
