'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Week_ID: 'r1234567-abcd-4ef0-9012-345678abcdef',
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                Title: 'Week 1: Introduction to the Course',
                Index: 1,
                Description: 'Overview of the course and its objectives.',
                Target: 'Understand the structure and goals of the course.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Week_ID: 's2345678-bcde-4f01-2345-67890abcdefgh',
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                Title: 'Week 2: Fundamentals of Business',
                Index: 2,
                Description: 'Introduction to key business concepts and principles.',
                Target: 'Grasp foundational business knowledge.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Week_ID: 't3456789-cdef-4f01-3456-7890abcdefghi',
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                Title: 'Week 3: Data Analysis Techniques',
                Index: 3,
                Description: 'Exploring various techniques for data analysis and visualization.',
                Target: 'Apply data analysis techniques to real-world scenarios.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Weeks', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Weeks', null, {});
    },
};
