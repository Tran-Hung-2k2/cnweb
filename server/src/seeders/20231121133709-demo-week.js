'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Week_ID: 'b5cea1b2-21b9-4078-9d82-9105bcd07c76',
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
                Title: 'Week 1: Introduction to the Course',
                Index: 1,
                Description: 'Overview of the course and its objectives.',
                Target: 'Understand the structure and goals of the course.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Week_ID: 'cb4b78fa-ec73-4e20-b690-50f502249739',
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
                Title: 'Week 2: Fundamentals of Business',
                Index: 2,
                Description: 'Introduction to key business concepts and principles.',
                Target: 'Grasp foundational business knowledge.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Week_ID: '12363635-c5a5-47ac-8c1e-9b8a81c0909d',
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
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
