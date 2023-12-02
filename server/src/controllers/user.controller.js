import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from '../services/firebase.service.js';

const controller = {
    // [GET] api/user/
    get_all_user: async_wrap(async (req, res) => {
        const queryParams = ['User_ID', 'Name', 'Role'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const users = await db.User.findAll({
            where: whereClause,
            attributes: ['User_ID', 'Name', 'Email', 'Avatar', 'Status', 'Role'],
        });
        return res.status(200).json(api_response(false, 'Lấy danh sách người dùng thành công', users));
    }),

    // [GET] /api/user/info
    get_user_info: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.token.id);
        return res.status(200).json(api_response(false, 'Lấy thông tin người dùng thành công', user));
    }),

    // [PATCH] /api/user/
    update_user: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.token.id);

        user.Name = req.body.Name || user.Name;
        if (req.file) {
            await firebase_service.delete_file(user.Avatar);
            const avatar = await firebase_service.upload_image(req.file.path);
            user.Avatar = avatar;
        }
        await user.save();
        return res.status(200).json(api_response(false, 'Lấy thông tin người dùng thành công'));
    }),
};

export default controller;
