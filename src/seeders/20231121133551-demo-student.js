'use strict';

const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashed_user_password = await bcrypt.hash('user', salt);
        const data = [
            {
                Student_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Name: 'Trần Việt Hùng',
                Email: 'tranviethung912002@gmail.com',
                Password: hashed_user_password,
                Avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Student_ID: 'd4567890-bcde-4f01-2345-67890abcdef1',
                Name: 'Dương Ngọc Hải',
                Email: 'hai@gmail.com',
                Password: hashed_user_password,
                Avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&usqp=CAU',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Students', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Students', null, {});
    },
};
