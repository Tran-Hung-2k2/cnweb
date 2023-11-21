import db from '../models/index.js';
import api_response from '../utils/api_response.js';

const controller = {
    // [GET] /api/parking_manager/
    async get_all_parking_manager(req, res) {
        try {
            const parking_managers = await db.Parking_Manager.findAll();
            return res
                .status(200)
                .json(api_response(false, 'Lấy danh sách quản lý bãi đỗ xe thành công', parking_managers));
        } catch (error) {
            return res.status(500).json(api_response(true, 'Lấy danh sách quản lý bãi đỗ xe thất bại'));
        }
    },

    // [POST] /api/parking_manager/
    async add_parking_manager(req, res) {
        try {
            const manager = await db.User.findByPk(req.body.User_ID);
            const parking = await db.Parking.findByPk(req.body.Parking_ID);

            if (!manager)
                return res.status(404).json(api_response(true, 'Không tìm thấy tài khoản người quản lý bãi đỗ xe'));

            if (!parking) return res.status(404).json(api_response(true, 'Không tìm thấy bãi đỗ xe'));

            if (manager.Role != 'manager' && manager.Role != 'admin')
                return res
                    .status(400)
                    .json(api_response(true, 'Bạn chỉ có thể cho phép tài khoản người quản lý quản lý bãi đỗ xe'));

            const parking_manager = await db.Parking_Manager.create({
                User_ID: manager.User_ID,
                Parking_ID: parking.Parking_ID,
            });

            return res.status(201).json(api_response(false, 'Thêm quản lý bãi đỗ xe mới thành công', parking_manager));
        } catch (error) {
            return res.status(500).json(api_response(true, 'Thêm quản lý bãi đỗ xe mới thất bại'));
        }
    },

    // [PATCH] /api/parking_manager/:user_id/:parking_id
    async update_parking_manager(req, res) {
        try {
            const parking_manager = await db.Parking_Manager.findOne({
                where: { User_ID: req.params.user_id, Parking_ID: req.params.parking_id },
            });

            const parking_managers = await db.Parking_Manager.findAll({
                where: {
                    [db.Sequelize.Op.or]: [{ User_ID: req.params.user_id }, { Parking_ID: req.params.parking_id }],
                },
            });

            const has_manager = parking_managers.some((manager) => manager.Is_Managing === true);
            if (has_manager && req.body.Is_Managing == true) {
                return res
                    .status(400)
                    .json(
                        api_response(
                            true,
                            'Bạn đang quản lý 1 bãi đỗ xe hoặc bãi đỗ xe này đã có người khác đang quản lý. Vui lòng thử lại sau.',
                        ),
                    );
            }

            if (!parking_manager) return res.status(404).json(api_response(true, 'Không tìm thấy quản lý bãi đỗ xe'));

            const user = await db.User.findByPk(req.token.id);

            if (user.User_ID != parking_manager.User_ID && user.Role != 'admin')
                return res
                    .status(400)
                    .json(
                        api_response(
                            true,
                            'Bạn không có quyền sửa đổi thông tin quản lý bãi đỗ xe của người quản lý khác',
                        ),
                    );

            if (parking_manager.User_ID == user.User_ID && user.Role == 'admin')
                return res.status(400).json(api_response(true, 'Admin không có quyền cho phép xe ra vào'));

            parking_manager.Is_Managing = req.body.Is_Managing;
            await parking_manager.save();

            return res.status(200).json(api_response(false, 'Cập nhật thông tin quản lý bãi đỗ xe thành công'));
        } catch (error) {
            return res.status(500).json(api_response(true, 'Cập nhật thông tin quản lý bãi đỗ xe thất bại'));
        }
    },

    // [DELETE] /api/parking_manager/:user_id/:parking_id
    async delete_parking_manager(req, res) {
        try {
            const result = await db.Parking_Manager.destroy({
                where: { User_ID: req.params.user_id, Parking_ID: req.params.parking_id },
            });

            if (result === 1) {
                return res.status(200).json(api_response(false, 'Xóa quản lý bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(api_response(true, 'Không tìm thấy quản lý bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(api_response(true, 'Xóa quản lý bãi đỗ xe thất bại'));
        }
    },
};

export default controller;
