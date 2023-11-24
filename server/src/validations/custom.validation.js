import db from '../models/index.js';
const label = require('../constants/label.js');

const validation = {
    // custom(fn)
    uuidv4Id: (value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
            return helpers.message('"{{#label}}" phải là UUIDv4');
        }
        return value;
    },

    confirmPassword: (value, helpers) => {
        if (value.Password !== value.Confirm_Password)
            return helpers.message('Mật khẩu xác nhận không khớp với Mật khẩu đã nhập');
        return value;
    },

    addStatus: (value, helpers) => {
        if (value.Role == label.role.ORGANIZATION) value.Status = label.user.PENDING_APPROVAL;
        else value.Status = label.user.APPROVAL;
        return value;
    },

    // external(fn)

    isNotRegistered: async (value, helpers) => {
        try {
            const isUserExist = await db.User.findOne({ where: { Email: value } });
            if (isUserExist) return helpers.message('"{{#label}}" đã được đăng ký trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isRegistered: async (value, helpers) => {
        try {
            const isUserExist = await db.User.findOne({ where: { Email: value } });
            if (!isUserExist) return helpers.message('"{{#label}}" chưa được đăng ký tài khoản trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },
};

export default validation;
