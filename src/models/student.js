'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Student.belongsToMany(models.Course, {
                through: 'Participating_Course',
                foreignKey: 'Student_ID',
                otherKey: 'Course_ID',
            });

            Student.belongsToMany(models.Lesson, {
                through: 'Participating_Lesson',
                foreignKey: 'Student_ID',
                otherKey: 'Lesson_ID',
            });
        }
    }

    Student.init(
        {
            Student_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Student',
        },
    );
    return Student;
};
