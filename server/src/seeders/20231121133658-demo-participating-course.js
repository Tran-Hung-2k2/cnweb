'use strict';
const label = require('../constants/label');


module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Course_ID: 'f9fecc71-9114-437d-94fc-8c9b9e802f73',
                Review_Content: 'Great course! Learned a lot.',
                Review_Star: 5,
                Date_Achieved: new Date('2023-01-01'),
                Status: label.parti_course.COMPLETED,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Course_ID: '26677ec6-8279-4253-84e4-e306e434392a',
                Review_Content: '',
                Review_Star: null,
                Date_Achieved: null,
                Status: label.parti_course.NOT_COMPLETED,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Course_ID: 'd769034a-5192-4259-8f46-59f79a52d446',
                Review_Content: '',
                Review_Star: null,
                Date_Achieved: null,
                Status: label.parti_course.PENDING_APPROVAL,
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
