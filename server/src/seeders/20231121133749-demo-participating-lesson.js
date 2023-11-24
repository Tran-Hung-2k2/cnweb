'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                User_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Lesson_ID: 'x1234567-abcd-4ef0-9012-345678abcdef',
                Status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Lesson_ID: 'y2345678-bcde-4f01-2345-67890abcdefgh',
                Status: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Lesson_ID: 'z3456789-cdef-4f01-3456-7890abcdefghi',
                Status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Participating_Lessons', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Participating_Lessons', null, {});
    },
};
