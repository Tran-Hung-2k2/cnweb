import label from '../constants/label.js';
import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] /api/course/
    get_all_courses: async_wrap(async (req, res) => {
        const courses = await db.Course.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách khóa học thành công', courses));
    }),

    // [GET] /api/course/:id
    get_course_by_id: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json(api_response(true, 'Không tìm thấy khóa học'));
        return res.status(200).json(api_response(false, 'Lấy thông tin khóa học thành công', course));
    }),

    // [POST] /api/course/
    add_course: async_wrap(async (req, res) => {
        req.body.User_ID = req.token.id;
        req.body.Status = label.course.PENDING_APPROVAL;
        const course = await db.Course.create({
            ...req.body,
        });
        return res.status(201).json(api_response(false, 'Thêm khóa học mới thành công', course));
    }),

    // [PATCH] /api/course/:id
    update_course: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json(api_response(true, 'Không tìm thấy khóa học'));
        if (course.User_ID != req.token.id)
            return res.status(404).json(api_response(true, 'Bạn không có quyền chỉnh sửa khóa học này'));

        course.Category_ID = req.body.Category_ID || course.Category_ID;
        course.Name = req.body.Name || course.Name;
        course.Description = req.body.Description || course.Description;
        course.Level = req.body.Level || course.Level;
        course.Need_Approval = req.body.Need_Approval || course.Need_Approval;
        course.Status = req.body.Status || course.Status;
        await course.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin khóa học thành công'));
    }),

    // [DELETE] /api/course/:id
    delete_course: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json(api_response(true, 'Không tìm thấy khóa học'));
        if (course.User_ID != req.token.id)
            return res.status(404).json(api_response(true, 'Bạn không có quyền chỉnh sửa khóa học này'));

        await db.Course.destroy({
            where: { Course_ID: course.User_ID },
        });

        return res.status(200).json(api_response(false, 'Xóa khóa học thành công'));
    }),
};

export default controller;
