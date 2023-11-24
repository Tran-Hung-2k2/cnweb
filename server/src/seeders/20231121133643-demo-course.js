'use strict';
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                User_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'g7890123-abcd-4ef0-9012-345678abcdef',
                Name: 'Introduction to Data Science',
                Description: 'A beginner-friendly course on data science principles.',
                Level: label.course_level.BEGINNER,
                Need_Approval: false,
                Status: label.course.VISIBLE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'o5678901-bcde-4f01-2345-67890abcdefgh',
                User_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'h8901234-bcde-4f01-2345-67890abcdefgh1',
                Name: 'Business Fundamentals',
                Description: 'Learn the basics of business operations and management.',
                Level: label.course_level.INTERMEDIATE,
                Need_Approval: true,
                Status: label.course.PENDING_APPROVAL,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'p6789012-cdef-4f01-3456-7890abcdefghi',
                User_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'i9012345-cdef-4f01-3456-7890abcdefghi2',
                Name: 'Advanced Data Analysis',
                Description: 'Explore advanced techniques in data analysis and visualization.',
                Level: label.course_level.ADVANCED,
                Need_Approval: false,
                Status: label.course.HIDDEN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'q7890123-defg-4f01-4567-890abcijklmn',
                User_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'j0123456-defg-4f01-4567-890abcijklmn3',
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
