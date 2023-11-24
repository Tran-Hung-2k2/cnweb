'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Lesson_ID: 'ec2eb35e-b1ad-435a-849f-225ac6e983d0',
                Status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Lesson_ID: '7196e3e2-3768-4570-b401-9231a2d59757',
                Status: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Lesson_ID: 'c01f160d-9bef-496b-90a2-d8d6ccdcc139',
                Status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Participating_Lessons', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Participating_Lessons', null, {});
    },
};
