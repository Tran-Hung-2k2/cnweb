'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                Organization_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'g7890123-abcd-4ef0-9012-345678abcdef',
                Name: 'Introduction to Data Science',
                Description: 'A beginner-friendly course on data science principles.',
                Level: 'Beginner',
                isNeedReview: false,
                Status: 'Visible',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'o5678901-bcde-4f01-2345-67890abcdefgh',
                Organization_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'h8901234-bcde-4f01-2345-67890abcdefgh1',
                Name: 'Business Fundamentals',
                Description: 'Learn the basics of business operations and management.',
                Level: 'Intermediate',
                isNeedReview: true,
                Status: 'Pending Approval',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'p6789012-cdef-4f01-3456-7890abcdefghi',
                Organization_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'i9012345-cdef-4f01-3456-7890abcdefghi2',
                Name: 'Advanced Data Analysis',
                Description: 'Explore advanced techniques in data analysis and visualization.',
                Level: 'Advanced',
                isNeedReview: false,
                Status: 'Hidden',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Course_ID: 'q7890123-defg-4f01-4567-890abcijklmn',
                Organization_ID: 'f6789012-bcde-4f01-7890-12abcdef345',
                Category_ID: 'j0123456-defg-4f01-4567-890abcijklmn3',
                Name: 'Strategic Business Management',
                Description: 'Develop strategic thinking and decision-making skills for business leaders.',
                Level: 'Expert',
                isNeedReview: true,
                Status: 'Visible',
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
