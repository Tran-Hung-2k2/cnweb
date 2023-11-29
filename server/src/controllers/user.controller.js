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

};

export default controller;
