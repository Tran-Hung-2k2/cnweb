'use strict';
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Category_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                Name: 'Introduction to Data Science',
                Description: 'A beginner-friendly course on data science principles.',
                Level: label.course_level.BEGINNER,
                Need_Approval: false,
                Status: label.course.VISIBLE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: '26677ec6-8279-4253-84e4-e306e434392a',
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Category_ID: 'ad9dea2e-7b47-4d35-9291-a60e69245523',
                Name: 'Business Fundamentals',
                Description: 'Learn the basics of business operations and management.',
                Level: label.course_level.INTERMEDIATE,
                Need_Approval: true,
                Status: label.course.PENDING_APPROVAL,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'd769034a-5192-4259-8f46-59f79a52d446',
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Category_ID: '1c33ffdb-a3be-4a3f-a7f8-d90186730b2b',
                Name: 'Advanced Data Analysis',
                Description: 'Explore advanced techniques in data analysis and visualization.',
                Level: label.course_level.ADVANCED,
                Need_Approval: false,
                Status: label.course.HIDDEN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: '25e06a8e-43d9-4d62-b0c5-7ba7f19ebf2b',
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Category_ID: '1b4ca2dc-6bf8-44b5-90e7-7f45b2443ab9',
                Name: 'Strategic Business Management',
                Description: 'Develop strategic thinking and decision-making skills for business leaders.',
                Level: label.course_level.EXPERT,
                Need_Approval: true,
                Status: label.course.VISIBLE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Courses', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Courses', null, {});
    },
};
