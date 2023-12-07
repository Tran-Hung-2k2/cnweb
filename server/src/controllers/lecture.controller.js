import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [GET] /api/lecture/
    get_all_lectures: async_wrap(async (req, res) => {
        const lectures = await db.Lecture.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách bài giảng thành công', lectures));
    }),

    // [GET] /api/lecture/:id
    get_lecture_by_id: async_wrap(async (req, res) => {
        const lecture = await db.Lecture.findByPk(req.params.id);

        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');

        return res.status(200).json(api_response(false, 'Lấy thông tin bài giảng thành công', lecture));
    }),

    // [GET] /api/lecture/week/:id
    get_lecture_by_week_id: async_wrap(async (req, res) => {
        const lectures = await db.Lecture.findAll({
            where: { Week_ID: req.params.id },
        });
        return res.status(200).json(api_response(false, 'Lấy thông tin bài giảng thành công', lectures));
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

        lecture.Lecture_Title = req.body.Lecture_Title || lecture.Lecture_Title;
        lecture.Index = req.body.Index || lecture.Index;
        await lecture.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin bài giảng thành công'));
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
            return res.status(200).json(api_response(false, 'Xóa bài giảng thành công'));
        } else {
            throw new APIError(404, 'Không tìm thấy bài giảng');
        }
    }),
};

export default controller;
