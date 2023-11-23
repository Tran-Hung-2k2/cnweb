'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Lecture_ID: 'u1234567-abcd-4ef0-9012-345678abcdef',
                Week_ID: 'r1234567-abcd-4ef0-9012-345678abcdef',
                Lecture_Title: 'Introduction to the Course Material',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lecture_ID: 'v2345678-bcde-4f01-2345-67890abcdefgh',
                Week_ID: 'r1234567-abcd-4ef0-9012-345678abcdef',
                Lecture_Title: 'Business Fundamentals Overview',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lecture_ID: 'w3456789-cdef-4f01-3456-7890abcdefghi',
                Week_ID: 'r1234567-abcd-4ef0-9012-345678abcdef',
                Lecture_Title: 'Exploring Data Analysis Techniques',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Lectures', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Lectures', null, {});
    },
};
