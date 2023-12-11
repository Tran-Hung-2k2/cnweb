'use strict';
const bcrypt = require('bcrypt');

const label = {
    role: {
        ADMIN: 'Admin',
        ORGANIZATION: 'Organization',
        STUDENT: 'Student',
    },
    user: {
        APPROVAL: 'Approval',
        PENDING_APPROVAL: 'Pending approval',
        LOCK: 'Lock',
    },
    course: {
        VISIBLE: 'Visible',
        HIDDEN: 'Hidden',
        PENDING_APPROVAL: 'Pending approval',
    },
    course_level: {
        BEGINNER: 'Beginner',
        INTERMEDIATE: 'Intermediate',
        ADVANCED: 'Advanced',
        EXPERT: 'Expert',
    },
    parti_course: {
        COMPLETED: 'Completed',
        NOT_COMPLETED: 'Not completed',
        PENDING_APPROVAL: 'Pending approval',
    },
    lesson_type: {
        READING: 'Reading',
        VIDEO: 'Video',
    },
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashed_admin_password = await bcrypt.hash('admin', salt);
        const hashed_organization_password = await bcrypt.hash('organization', salt);
        const hashed_user_password = await bcrypt.hash('student', salt);
        const data = [
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Name: 'Trần Việt Hùng',
                Email: 'tranhung912002@gmail.com',
                Password: hashed_user_password,
                Avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png',
                Status: label.user.APPROVAL,
                Role: label.role.STUDENT,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '5f3e964e-8d2e-4b6a-9462-80bbdec33ae8',
                Name: 'Dương Ngọc Hải',
                Email: 'hai@gmail.com',
                Password: hashed_user_password,
                Avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&usqp=CAU',
                Status: label.user.APPROVAL,
                Role: label.role.STUDENT,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Name: 'Trần Hùng',
                Email: 'tranviethung912002@gmail.com',
                Password: hashed_admin_password,
                Avatar: 'https://cdn2.iconfinder.com/data/icons/shopping-colorline/64/admin-512.png',
                Status: label.user.APPROVAL,
                Role: label.role.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Name: 'Đại học Bách khoa Hà Nội',
                Email: 'hust@sis.hust.edu.vn',
                Password: hashed_organization_password,
                Avatar: 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1365px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png',
                Status: label.user.APPROVAL,
                Role: label.role.ORGANIZATION,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '27fe9583-6365-4046-8c3c-021c38a6b351',
                Name: 'Đại học Xây dựng',
                Email: 'nuce@sis.nuce.edu.vn',
                Password: hashed_organization_password,
                Avatar: 'https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Xay-Dung-Ha-Noi-NUCE.png',
                Status: label.user.PENDING_APPROVAL,
                Role: label.role.ORGANIZATION,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Users', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
