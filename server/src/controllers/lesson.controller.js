import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from './src/services/firebase.service.js';

const controller = {
    // [POST] api/parking/:id
    add_lesson: async_wrap(async (req, res) => {
        if (!req.file) {
            return res.status(400).json(api_response(true, 'Không có file'));
        }
        const downloadURL = await firebase_service.upload_video(req.file.path);
        return res.status(201).json(api_response(true, 'Tạo lesson thành công', downloadURL));
    }),
};

export default controller;
