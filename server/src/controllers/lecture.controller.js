import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    updateCourse: async (id) => {
        const course = await db.Course.findByPk(id);
        const level = course.Level;
        course.Level = '';
        await course.save();
        course.Level = level;
        await course.save();
    },

    // [GET] /api/lecture/
    get_all_lectures: async_wrap(async (req, res) => {
        const queryParams = ['Lecture_ID', 'Week_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const lectures = await db.Lecture.findAll({ where: whereClause });

        if (lectures.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách bài giảng thành công', lectures));
        else return res.status(200).json(api_response(false, 'Không tìm thấy bài giảng nào', lectures));
    }),

    // [POST] /api/lecture/
    add_lecture: async_wrap(async (req, res) => {
        const week = await db.Week.findOne({
            where: {
                Week_ID: req.body.Week_ID,
            },
            include: {
                model: db.Course,
                attributes: ['Course_ID', 'User_ID'],
            },
        });

        if (!week) throw new APIError(404, 'Không tìm thấy tuần học');
        if (week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài giảng vào khóa học này');

        const lecture = await db.Lecture.create({
            ...req.body,
        });
        await controller.updateCourse(week.Course_ID);
        return res.status(201).json(api_response(false, 'Thêm bài giảng mới thành công', lecture));
    }),

    // [PATCH] /api/lecture/:id
    update_lecture: async_wrap(async (req, res) => {
        const lecture = await db.Lecture.findByPk(req.params.id);
        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');

        const week = await db.Week.findOne({
            where: {
                Week_ID: lecture.Week_ID,
            },
            include: {
                model: db.Course,
                attributes: ['Course_ID', 'User_ID'],
            },
        });
        if (week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài giảng vào khóa học này');

        if (req.body.Week_ID) {
            const weekUpdate = await db.Week.findOne({
                where: {
                    Week_ID: req.body.Week_ID,
                },
            });

            if (week.Course_ID != weekUpdate.Course_ID)
                throw new APIError(400, 'Chỉ có thể chuyển bài giảng giữa các tuần trong một khóa học');
            else lecture.Week_ID = req.body.Week_ID;
        }

        lecture.Lecture_Title = req.body.Lecture_Title || lecture.Lecture_Title;
        lecture.Index = req.body.Index || lecture.Index;
        await lecture.save();

        await controller.updateCourse(week.Course_ID);

        return res.status(200).json(api_response(false, 'Cập nhật thông tin bài giảng thành công', lecture));
    }),

    // [DELETE] /api/lecture/:id
    delete_lecture: async_wrap(async (req, res) => {
        const lecture = await db.Lecture.findByPk(req.params.id);

        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');

        const week = await db.Week.findOne({
            where: {
                Week_ID: lecture.Week_ID,
            },
            include: {
                model: db.Course,
                attributes: ['Course_ID', 'User_ID'],
            },
        });
        if (week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài giảng vào khóa học này');

        const result = await db.Lecture.destroy({
            where: { Lecture_ID: req.params.id },
        });

        if (result === 1) {
            await controller.updateCourse(week.Course_ID);
            return res.status(200).json(api_response(false, 'Xóa bài giảng thành công'));
        } else {
            throw new APIError(404, 'Không tìm thấy bài giảng');
        }
    }),
};

export default controller;
