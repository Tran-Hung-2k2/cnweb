'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Student_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Course_ID: 'n4567890-abcd-4ef0-9012-345678abcdef',
                Review_Content: 'Great course! Learned a lot.',
                Review_Star: 5,
                Date_Achieved: new Date('2023-01-01'),
                Status: 'Completed',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Student_ID: 'd4567890-bcde-4f01-2345-67890abcdefgh',
                Course_ID: 'o5678901-bcde-4f01-2345-67890abcdefgh',
                Review_Content: '',
                Review_Star: null,
                Date_Achieved: null,
                Status: 'Not Completed',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Student_ID: 'c3456789-abcd-4ef0-1234-567890abcdef',
                Course_ID: 'p6789012-cdef-4f01-3456-7890abcdefghi',
                Review_Content: '',
                Review_Star: null,
                Date_Achieved: null,
                Status: 'Pending Approval',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Participating_Courses', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Participating_Courses', null, {});
    },
};
