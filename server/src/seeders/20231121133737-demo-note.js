'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Note_ID: '90673a2b-8f39-48a0-b672-3de573496f3f',
                Lesson_ID: 'ec2eb35e-b1ad-435a-849f-225ac6e983d0',
                Note_Content: 'Important points from the introduction video.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Note_ID: '997e67f7-33a4-4ad9-a739-fadb9bcbf458',
                Lesson_ID: '7196e3e2-3768-4570-b401-9231a2d59757',
                Note_Content: 'Key ethical principles discussed in the lesson.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Note_ID: '550d29af-c10d-4b86-ad04-9d42943b77b6',
                Lesson_ID: 'c01f160d-9bef-496b-90a2-d8d6ccdcc139',
                Note_Content: 'Notes on data visualization techniques and tools.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Notes', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Notes', null, {});
    },
};
