import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from '../services/firebase.service.js';

const controller = {
    // [GET] api/user/
    getAllUser: async_wrap(async (req, res) => {
        const data = await db.User.findAll();
        console.log(data)
        return res.status(200).json(api_response(false, 'Lấy danh sách người dùng thành công', data));
    }),
};

export default controller;
