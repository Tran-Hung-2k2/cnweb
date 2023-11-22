'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Category_ID: 'g7890123-abcd-4ef0-9012-345678abcdef',
                Name: 'Data Science',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'h8901234-bcde-4f01-2345-67890abcdefgh1',
                Name: 'Business',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'i9012345-cdef-4f01-3456-7890abcdefghi2',
                Name: 'Computer Science',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'j0123456-defg-4f01-4567-890abcijklmn3',
                Name: 'Information Technology',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'k1234567-efgh-4i01-5678-90abcdefghij4',
                Name: 'Language Learning',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'l2345678-fghi-4j01-6789-0abcdefghijkl5',
                Name: 'Health',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'm3456789-hijk-4k01-7890-abcdefghijklm6',
                Name: 'Math and Logic',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Categories', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
