'use strict';

const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Lesson_ID: 'x1234567-abcd-4ef0-9012-345678abcdef',
                Lecture_ID: 'u1234567-abcd-4ef0-9012-345678abcdef',
                Title: 'Course Introduction',
                Type: label.lesson_type.READING,
                Duration: 1 * 60,
                Content: 'Welcome to the course! In this lesson, we introduce the course content and objectives.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lesson_ID: 'y2345678-bcde-4f01-2345-67890abcdefgh',
                Lecture_ID: 'u1234567-abcd-4ef0-9012-345678abcdef',
                Title: 'Business Ethics',
                Type: label.lesson_type.READING,
                Duration: 5 * 60,
                Content:
                    "This lesson covers the principles of business ethics and its importance in today's business environment.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lesson_ID: 'z3456789-cdef-4f01-3456-7890abcdefghi',
                Lecture_ID: 'u1234567-abcd-4ef0-9012-345678abcdef',
                Title: 'Data Visualization Techniques',
                Type: label.lesson_type.VIDEO,
                Duration: 10 * 60,
                Content: 'https://youtu.be/fNs6_k5sWiU?si=RybnrcNDXQDN-U6W',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Lessons', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Lessons', null, {});
    },
};
