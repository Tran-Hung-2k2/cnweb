import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [GET] /api/category/
    get_all_categories: async_wrap(async (req, res) => {
        const queryParams = ['Category_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const categories = await db.Category.findAll({ where: whereClause });

        if (categories.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách danh mục khóa học thành công', categories));
        else return res.status(200).json(api_response(false, 'Không tìm thấy danh mục khóa học nào', categories));
    }),

    // [POST] /api/category/
    add_category: async_wrap(async (req, res) => {
        const category = await db.Category.create({
            Name: req.body.Name,
        });
        return res.status(201).json(api_response(false, 'Thêm danh mục khóa học mới thành công', category));
    }),

    // [PATCH] /api/category/:id
    update_category: async_wrap(async (req, res) => {
        const category = await db.Category.findByPk(req.params.id);
        if (!category) throw new APIError(404, 'Không tìm thấy danh mục khóa học');

        category.Name = req.body.Name;
        const result = await category.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin danh mục khóa học thành công', result));
    }),

    // [DELETE] /api/category/:id
    delete_category: async_wrap(async (req, res) => {
        const result = await db.Category.destroy({
            where: { Category_ID: req.params.id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa danh mục khóa học thành công'));
        else throw new APIError(404, 'Không tìm thấy danh mục khóa học');
    }),
};

export default controller;
