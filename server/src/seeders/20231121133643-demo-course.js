'use strict';
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Category_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                Name: 'Introduction to Data Science',
                Description: 'A beginner-friendly course on data science principles.',
                Image: 'https://cdn.educba.com/academy/wp-content/uploads/2019/03/Introduction-To-Data-Science.jpg',
                Level: label.course_level.BEGINNER,
                Need_Approval: false,
                Status: label.course.VISIBLE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: '26677ec6-8279-4253-84e4-e306e434392a',
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Category_ID: 'ad9dea2e-7b47-4d35-9291-a60e69245523',
                Name: 'Business Fundamentals',
                Description: 'Learn the basics of business operations and management.',
                Image: 'https://i.pinimg.com/originals/b7/f8/83/b7f8839557d786669318ce683ddc7d1a.png',
                Level: label.course_level.INTERMEDIATE,
                Need_Approval: true,
                Status: label.course.PENDING_APPROVAL,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'd769034a-5192-4259-8f46-59f79a52d446',
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Category_ID: '1c33ffdb-a3be-4a3f-a7f8-d90186730b2b',
                Name: 'Advanced Data Analysis',
                Description: 'Explore advanced techniques in data analysis and visualization.',
                Image: 'https://www.geeky-gadgets.com/wp-content/uploads/2023/09/ChatGPT-Advanced-Data-Analysis.jpg',
                Level: label.course_level.ADVANCED,
                Need_Approval: false,
                Status: label.course.HIDDEN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: '25e06a8e-43d9-4d62-b0c5-7ba7f19ebf2b',
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Category_ID: '1b4ca2dc-6bf8-44b5-90e7-7f45b2443ab9',
                Name: 'Strategic Business Management',
                Description: 'Develop strategic thinking and decision-making skills for business leaders.',
                Image: 'https://www.zimyo.com/wp-content/uploads/2023/02/sm-photo.png',
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
