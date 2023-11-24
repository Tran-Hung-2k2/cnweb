import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] /api/week/
    get_all_weeks: async_wrap(async (req, res) => {
        const weeks = await db.Week.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách tuần học thành công', weeks));
    }),

    // [GET] /api/week/:id
    get_week_by_id: async_wrap(async (req, res) => {
        const week = await db.Week.findByPk(req.params.id);
        if (!week) return res.status(404).json(api_response(true, 'Không tìm thấy tuần học'));
        return res.status(200).json(api_response(false, 'Lấy thông tin tuần học thành công', week));
    }),

    // [POST] /api/week/
    add_week: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.body.Course_ID);
        if (!course) return res.status(404).json(api_response(true, 'Không tìm thấy khóa học'));
        if (course.User_ID != req.token.id)
            return res.status(403).json(api_response(true, 'Bạn không có quyền thêm tuần học vào khóa học này'));

        const week = await db.Week.create({
            ...req.body,
        });
        return res.status(201).json(api_response(false, 'Thêm tuần học mới thành công', week));
    }),

    // [PATCH] /api/week/:id
    update_week: async_wrap(async (req, res) => {
        const week = await db.Week.findByPk(req.params.id);
        if (!week) return res.status(404).json(api_response(true, 'Không tìm thấy tuần học'));

        const course = await db.Course.findByPk(week.Course_ID);
        if (course.User_ID != req.token.id)
            return res.status(403).json(api_response(true, 'Bạn không có quyền chỉnh sửa khóa học này'));

        week.Title = req.body.Title || week.Title;
        week.Index = req.body.Index || week.Index;
        week.Description = req.body.Description || week.Description;
        week.Target = req.body.Target || week.Target;
        await week.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin tuần học thành công'));
    }),

    // [DELETE] /api/week/:id
    delete_week: async_wrap(async (req, res) => {
        const week = await db.Week.findByPk(req.params.id);
        if (!week) return res.status(404).json(api_response(true, 'Không tìm thấy tuần học'));

        const course = await db.Course.findByPk(week.Course_ID);
        if (course.User_ID != req.token.id)
            return res.status(403).json(api_response(true, 'Bạn không có quyền chỉnh sửa khóa học này'));

        await db.Week.destroy({
            where: { Week_ID: req.params.id },
        });

        return res.status(200).json(api_response(false, 'Xóa tuần học thành công'));
    }),
};

export default controller;
