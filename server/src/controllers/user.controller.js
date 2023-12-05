import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from '../services/firebase.service.js';

const controller = {
    // [GET] api/user/
    get_all_user: async_wrap(async (req, res) => {
        const data = await db.User.findAll();
        console.log(data)
        return res.status(200).json(api_response(false, 'Lấy danh sách người dùng thành công', data));
    }),
    // [GET] /api/user/:id
    get_user_by_id: async_wrap(async (req, res) => {
        const user_by_id = await db.User.findByPk(req.params.id);
        if (!user_by_id) return res.status(404).json(api_response(true, 'Không tìm thấy người dùng'));
        return res.status(200).json(api_response(false, 'Lấy thông tin người dùng thành công', user_by_id));
    }),
    // [PATCH] /api/user/:id
    update_user: async_wrap(async (req, res) => {
        const user_by_id = await db.User.findByPk(req.params.id);
        if (!user_by_id) return res.status(404).json(api_response(true, 'Không tìm thấy người dùng'));
        if (user_by_id.User_ID != req.token.id)
            return res.status(403).json(api_response(true, 'Bạn không có quyền chỉnh sửa thông tin người dùng này'));

        course.Category_ID = req.body.Category_ID || course.Category_ID;
        course.Name = req.body.Name || course.Name;
        course.Description = req.body.Description || course.Description;
        course.Level = req.body.Level || course.Level;
        course.Need_Approval = req.body.Need_Approval != undefined ? req.body.Need_Approval : course.Need_Approval;
        course.Status = req.body.Status || course.Status;
        if (req.file) {
            await firebase_service.delete_file(course.Image);
            course.Image = await firebase_service.upload_image(req.file.path);
        }
        await course.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin khóa học thành công'));
    }),

    // [DELETE] /api/course/:id
    delete_user: async_wrap(async (req, res) => {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json(api_response(true, 'Không tìm thấy khóa học'));
        if (course.User_ID != req.token.id)
            return res.status(403).json(api_response(true, 'Bạn không có quyền chỉnh sửa khóa học này'));

        await firebase_service.delete_file(course.Image);
        await db.Course.destroy({
            where: { Course_ID: req.params.id },
        });

        return res.status(200).json(api_response(false, 'Xóa khóa học thành công'));
    }),

};

export default controller;
