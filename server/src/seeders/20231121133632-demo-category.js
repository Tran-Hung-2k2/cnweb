'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Category_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                Name: 'Data Science',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'ad9dea2e-7b47-4d35-9291-a60e69245523',
                Name: 'Business',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: '1c33ffdb-a3be-4a3f-a7f8-d90186730b2b',
                Name: 'Computer Science',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: '1b4ca2dc-6bf8-44b5-90e7-7f45b2443ab9',
                Name: 'Information Technology',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: 'a146ac00-a13c-4f43-8618-f996b1140acf',
                Name: 'Language Learning',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: '986fcdfa-f66a-4a0f-a771-7c6189e66b11',
                Name: 'Health',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Category_ID: '8f8a2313-70dd-4e81-909b-9fbd7e64dc0c',
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
