'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Lesson.belongsTo(models.Lecture, {
                foreignKey: 'Lecture_ID',
                onDelete: 'CASCADE',
            });

            Lesson.hasOne(models.Note, {
                foreignKey: 'Lesson_ID',
                onDelete: 'CASCADE',
            });

            Lesson.hasMany(models.Completed_Lesson, {
                foreignKey: 'Lesson_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Lesson.init(
        {
            Lesson_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Lecture_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Content: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Lesson',
        },
    );
    return Lesson;
};
