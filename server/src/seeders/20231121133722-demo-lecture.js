'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Lecture_ID: 'eb1ec7f9-b306-457e-b07e-1bca2c2a8a09',
                Week_ID: 'b5cea1b2-21b9-4078-9d82-9105bcd07c76',
                Lecture_Title: 'Introduction to the Course Material',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lecture_ID: '2ce84ffe-9aba-448d-bea4-05bf0d3bfa03',
                Week_ID: 'b5cea1b2-21b9-4078-9d82-9105bcd07c76',
                Lecture_Title: 'Business Fundamentals Overview',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Lecture_ID: 'e464d9ef-b3b7-4e06-81b9-034117ed98dd',
                Week_ID: 'b5cea1b2-21b9-4078-9d82-9105bcd07c76',
                Lecture_Title: 'Exploring Data Analysis Techniques',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Lectures', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Lectures', null, {});
    },
};
