'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Completed_Lesson extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ ở đây
            Completed_Lesson.belongsTo(models.User, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });

            Completed_Lesson.belongsTo(models.Lesson, {
                foreignKey: 'Lesson_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Completed_Lesson.init(
        {
            User_ID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            Lesson_ID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'Completed_Lesson',
        },
    );
    return Completed_Lesson;
};
