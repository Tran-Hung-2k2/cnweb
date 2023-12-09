'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lecture extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Lecture.belongsTo(models.Week, {
                foreignKey: 'Week_ID',
                onDelete: 'CASCADE',
            });

            Lecture.hasMany(models.Lesson, {
                foreignKey: 'Lecture_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Lecture.init(
        {
            Lecture_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Week_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Lecture_Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Lecture',
        },
    );
    return Lecture;
};
