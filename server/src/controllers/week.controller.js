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

    // [GET] /api/week/
    get_all_weeks: async_wrap(async (req, res) => {
        const queryParams = ['Week_ID', 'Course_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const weeks = await db.Week.findAll({ where: whereClause });

        if (weeks.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách tuần học thành công', weeks));
        else return res.status(200).json(api_response(false, 'Không tìm thấy bài học nào', weeks));
    }),

    // [POST] /api/week/
    add_week: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.body.Course_ID);
        if (!course) throw new APIError(404, 'Không tìm thấy khóa học');
        if (course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm tuần học vào khóa học này');

        const week = await db.Week.create({
            ...req.body,
        });
        await controller.updateCourse(week.Course_ID);
        return res.status(201).json(api_response(false, 'Thêm tuần học mới thành công', week));
    }),

    // [PATCH] /api/week/:id
    update_week: async_wrap(async (req, res) => {
        const week = await db.Week.findByPk(req.params.id);
        if (!week) throw new APIError(404, 'Không tìm thấy tuần học');

        const course = await db.Course.findByPk(week.Course_ID);
        if (course.User_ID != req.token.id) throw new APIError(403, 'Bạn không có quyền chỉnh sửa khóa học này');

        week.Title = req.body.Title || week.Title;
        week.Index = req.body.Index || week.Index;
        week.Description = req.body.Description || week.Description;
        week.Target = req.body.Target || week.Target;

        const data = await week.save();

        await controller.updateCourse(week.Course_ID);
        return res.status(200).json(api_response(false, 'Cập nhật thông tin tuần học thành công', data));
    }),

    // [DELETE] /api/week/:id
    delete_week: async_wrap(async (req, res) => {
        const week = await db.Week.findByPk(req.params.id);
        if (!week) throw new APIError(404, 'Không tìm thấy tuần học');

        const course = await db.Course.findByPk(week.Course_ID);
        if (course.User_ID != req.token.id) throw new APIError(403, 'Bạn không có quyền chỉnh sửa khóa học này');

        await db.Week.destroy({
            where: { Week_ID: req.params.id },
        });

        await controller.updateCourse(week.Course_ID);
        return res.status(200).json(api_response(false, 'Xóa tuần học thành công'));
    }),
};

export default controller;
