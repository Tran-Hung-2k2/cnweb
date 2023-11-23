'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Note_ID: 'aa123456-7890-4bcd-9ef0-123456789abc',
                Lesson_ID: 'x1234567-abcd-4ef0-9012-345678abcdef',
                Note_Content: 'Important points from the introduction video.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Note_ID: 'bb234567-8901-4cde-aef0-23456789abcd',
                Lesson_ID: 'y2345678-bcde-4f01-2345-67890abcdefgh',
                Note_Content: 'Key ethical principles discussed in the lesson.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Note_ID: 'cc345678-9012-4def-1234-56789abcdef',
                Lesson_ID: 'z3456789-cdef-4f01-3456-7890abcdefghi',
                Note_Content: 'Notes on data visualization techniques and tools.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Notes', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Notes', null, {});
    },
};
