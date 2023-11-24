'use strict';

const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Lesson_ID: 'ec2eb35e-b1ad-435a-849f-225ac6e983d0',
                Lecture_ID: 'eb1ec7f9-b306-457e-b07e-1bca2c2a8a09',
                Title: 'Course Introduction',
                Type: label.lesson_type.READING,
                Duration: 1 * 60,
                Content: 'Welcome to the course! In this lesson, we introduce the course content and objectives.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lesson_ID: '7196e3e2-3768-4570-b401-9231a2d59757',
                Lecture_ID: 'eb1ec7f9-b306-457e-b07e-1bca2c2a8a09',
                Title: 'Business Ethics',
                Type: label.lesson_type.READING,
                Duration: 5 * 60,
                Content:
                    "This lesson covers the principles of business ethics and its importance in today's business environment.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lesson_ID: 'c01f160d-9bef-496b-90a2-d8d6ccdcc139',
                Lecture_ID: 'eb1ec7f9-b306-457e-b07e-1bca2c2a8a09',
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
