import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [POST] /api/completed_lesson/
    add_completed_lesson: async_wrap(async (req, res) => {
        const category = await db.Completed_Lesson.create({
            ...req.body,
            User_ID: req.token.id,
        });
        return res.status(201).json(api_response(false, 'Đánh dấu hoàn thành bài học thành công', category));
    }),

    // [DELETE] /api/completed_lesson/:id
    delete_completed_lesson: async_wrap(async (req, res) => {
        const result = await db.Completed_Lesson.destroy({
            where: {
                User_ID: req.token.id,
                Lesson_ID: req.params.id,
            },
        });

        if (result === 1)
            return res.status(200).json(api_response(false, 'Hủy đánh dấu hoàn thành bài học thành công'));
        else throw new APIError(404, 'Hủy đánh dấu hoàn thành bài học thất bại');
    }),
};

export default controller;
