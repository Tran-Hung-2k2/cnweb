'use strict';
const bcrypt = require('bcrypt');
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashed_admin_password = await bcrypt.hash('admin', salt);
        const hashed_organization_password = await bcrypt.hash('organization', salt);
        const data = [
            {
                Training_Organization_ID: 'e5678901-abcd-4ef0-5678-901abcdef234',
                Name: 'Admin',
                Email: 'tranviethung912002@gmail.com',
                Password: hashed_admin_password,
                Avatar: 'https://cdn2.iconfinder.com/data/icons/shopping-colorline/64/admin-512.png',
                Status: label.org.APPROVAL,
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Training_Organization_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Name: 'Đại học Bách khoa Hà Nội',
                Email: 'hust@sis.hust.edu.vn',
                Password: hashed_organization_password,
                Avatar: 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1365px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png',
                Status: label.org.APPROVAL,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Training_Organization_ID: 'g7890123-abcd-4ef0-9012-345678abcdef',
                Name: 'Đại học Xây dựng',
                Email: 'nuce@sis.nuce.edu.vn',
                Password: hashed_organization_password,
                Avatar: 'https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Xay-Dung-Ha-Noi-NUCE.png',
                Status: label.org.PENDING_APPROVAL,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Training_Organizations', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Training_Organizations', null, {});
    },
};
