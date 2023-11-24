import db from '../models/index.js';

const validation = {
    // custom(fn)
    uuidv4Id: (value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
            return helpers.message('"{{#label}}" phải có dạng uuidv4');
        }
        return value;
    },

    confirmPassword: (value, helpers) => {
        if (value.Password !== value.Confirm_Password)
            return helpers.message('Mật khẩu xác nhận không khớp với Mật khẩu đã nhập');
        return value;
    },

    // external(fn)

    isNotRegistered: async (value, helpers) => {
        try {
            const user = await db.User.findOne({ where: { Email: value } });
            if (user) return helpers.message('"{{#label}}" đã được đăng ký trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isRegistered: async (value, helpers) => {
        try {
            const user = await db.User.findOne({ where: { Email: value } });
            if (!user) return helpers.message('"{{#label}}" chưa được đăng ký tài khoản trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isCategoryExists: async (value, helpers) => {
        try {
            const category = await db.Category.findByPk(value);
            if (category) return helpers.message('"{{#label}}" không tồn tại');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isCategoryNameNotExists: async (value, helpers) => {
        try {
            const category = await db.Category.findOne({ where: { Name: value } });
            if (category) return helpers.message('"{{#label}}" đã tồn tại');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },
};

export default validation;
