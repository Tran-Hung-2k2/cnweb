import label from '../constants/label.js';
import db from '../models/index.js';
import token_service from '../services/token.service.js';

const middleware = {
    verify_token(req, res, next) {
        const access_token = req.cookies.access_token;
        if (access_token) {
            token_service.verify_token(access_token, process.env.JWT_ACCESS_KEY, (err, token_decode) => {
                if (err) {
                    return res.status(403).json({
                        is_error: true,
                        message: 'Bạn không có quyền truy cập tài nguyên này',
                    });
                }
                req.token = token_decode;
                next();
            });
        } else {
            return res.status(401).json({
                is_error: true,
                message: 'Vui lòng đăng nhập để tiếp tục',
            });
        }
    },

    verify(req, res, next, roles) {
        middleware.verify_token(req, res, async () => {
            const user = await db.User.findByPk(req.token.id);
            if (user && roles.includes(user.Role)) {
                next();
            } else {
                return res.status(403).json({
                    is_error: true,
                    message: 'Bạn không có quyền truy cập tài nguyên này',
                });
            }
        });
    },

    verify_user(req, res, next) {
        middleware.verify(req, res, next, [label.role.STUDENT]);
    },

    verify_org(req, res, next) {
        middleware.verify(req, res, next, [label.role.ORGANIZATION]);
    },

    verify_admin(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN]);
    },

    verify_admin_and_org(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN, label.role.ORGANIZATION]);
    },

    verify_all_user(req, res, next) {
        middleware.verify(req, res, next, [...Object.values(label.role)]);
    },
};

export default middleware;