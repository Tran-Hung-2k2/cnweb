import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from '../services/firebase.service.js';
import label from '../constants/label.js';
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

    // [GET] /api/lesson/
    get_all_lessons: async_wrap(async (req, res) => {
        const queryParams = ['Lesson_ID', 'Lecture_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        if (Object.keys(whereClause).length === 0 && req.token.role != 'admin')
            throw new APIError(403, 'Bạn không có quyền truy cập tài nguyên này');

        const lessons = await db.Lesson.findAll({ where: whereClause });
        if (lessons.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách bài học thành công', lessons));
        else return res.status(200).json(api_response(false, 'Không tìm thấy bài học nào', lessons));
    }),

    // [POST] /api/lesson/
    add_lesson: async_wrap(async (req, res) => {
        const lecture = await db.Lecture.findOne({
            where: {
                Lecture_ID: req.body.Lecture_ID,
            },
            attributes: ['Lecture_ID'],
            include: [
                {
                    model: db.Week,
                    attributes: ['Week_ID'],
                    include: [
                        {
                            model: db.Course,
                            attributes: ['User_ID'],
                        },
                    ],
                },
            ],
        });

        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');

        if (lecture.Week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài học vào khóa học này');

        if (req.body.Type === label.lesson_type.VIDEO) {
            if (!req.file) throw new APIError(400, 'Video nội dung bài học là bắt buộc');
            const video_info = await firebase_service.upload_video(req.file.path);
            req.body.Content = video_info.url;
            req.body.Duration = video_info.duration;
        }
        console.log(req.body);
        const lesson = await db.Lesson.create({
            ...req.body,
        });

        await controller.updateCourse(lecture.Week.Course.Course_ID);
        return res.status(201).json(api_response(false, 'Thêm bài học mới thành công', lesson));
    }),

    // [PATCH] /api/lesson/:id
    update_lesson: async_wrap(async (req, res) => {
        const lesson = await db.Lesson.findByPk(req.params.id);
        if (!lesson) throw new APIError(404, 'Không tìm thấy bài học');

        const lecture = await db.Lecture.findOne({
            where: {
                Lecture_ID: lesson.Lecture_ID,
            },
            include: [
                {
                    model: db.Week,
                    attributes: ['Week_ID'],
                    include: [
                        {
                            model: db.Course,
                            attributes: ['User_ID'],
                        },
                    ],
                },
            ],
        });

        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');
        if (lecture.Week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài học vào khóa học này');

        lesson.Lecture_ID = req.body.Lecture_ID || lesson.Lecture_ID;
        lesson.Title = req.body.Title || lesson.Title;
        lesson.Index = req.body.Index || lesson.Index;
        lesson.Duration = lesson.Type === label.lesson_type.READING ? req.body.Duration : lesson.Duration;
        lesson.Content = lesson.Type === label.lesson_type.READING ? req.body.Content : lesson.Content;
        if (lesson.Type === label.lesson_type.VIDEO && req.file) {
            await firebase_service.delete_file(lesson.Content);
            const video_info = await firebase_service.upload_video(req.file.path);
            lesson.Content = video_info.url;
            lesson.Duration = video_info.duration;
        }
        const result = await lesson.save();

        await controller.updateCourse(lecture.Week.Course.Course_ID);

        return res.status(200).json(api_response(false, 'Cập nhật thông tin bài học thành công', result));
    }),

    // [DELETE] /api/lesson/:id
    delete_lesson: async_wrap(async (req, res) => {
        const lesson = await db.Lesson.findByPk(req.params.id);
        if (!lesson) throw new APIError(404, 'Không tìm thấy bài học');

        const lecture = await db.Lecture.findOne({
            where: {
                Lecture_ID: lesson.Lecture_ID,
            },
            include: [
                {
                    model: db.Week,
                    attributes: ['Week_ID'],
                    include: [
                        {
                            model: db.Course,
                            attributes: ['User_ID'],
                        },
                    ],
                },
            ],
        });

        if (!lecture) throw new APIError(404, 'Không tìm thấy bài giảng');
        if (lecture.Week.Course.User_ID != req.token.id)
            throw new APIError(403, 'Bạn không có quyền thêm bài học vào khóa học này');

        if (lesson.Type === label.lesson_type.VIDEO) await firebase_service.delete_file(lesson.Content);

        const result = await db.Lesson.destroy({
            where: { Lesson_ID: req.params.id },
        });
        if (result === 1) {
            await controller.updateCourse(lecture.Week.Course.Course_ID);
            return res.status(200).json(api_response(false, 'Xóa bài học thành công'));
        } else {
            throw new APIError(404, 'Không tìm thấy bài học để xóa');
        }
    }),
};

export default controller;
