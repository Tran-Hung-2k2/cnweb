'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Student_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Name: 'John Doe',
                Email: 'john.doe@example.com',
                Password: 'hashed_password_1', // Remember to hash passwords in a real application
                Avatar: 'path/to/avatar1.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Student_ID: 'd4567890-bcde-4f01-2345-67890abcdef1',
                Name: 'Jane Doe',
                Email: 'jane.doe@example.com',
                Password: 'hashed_password_2',
                Avatar: 'path/to/avatar2.jpg',
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
