import db from '../models/index.js';

const validation = {
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

    isNotRegistered: async (value, helpers) => {
        try {
            const isStudentExist = await db.Student.findOne({ where: { Email: value } });
            const isOrgExist = await db.Training_Organization.findOne({ where: { Email: value } });
            if (isStudentExist || isOrgExist) return helpers.message('Email đã được đăng ký trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isRegistered: async (value, helpers) => {
        try {
            const isStudentExist = await db.Student.findOne({ where: { Email: value } });
            const isOrgExist = await db.Training_Organization.findOne({ where: { Email: value } });
            if (!isOrgExist && !isStudentExist) return helpers.message('Email chưa được đăng ký tài khoản trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },
};

export default validation;
