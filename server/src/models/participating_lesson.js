'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Participating_Lesson extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ ở đây
        }
    }

    Participating_Lesson.init(
        {
            User_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Lesson_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Participating_Lesson',
        },
    );
    return Participating_Lesson;
};
