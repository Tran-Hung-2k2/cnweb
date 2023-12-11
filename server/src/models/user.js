'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            // User.belongsToMany(models.Course, {
            //     through: 'Participating_Course',
            //     foreignKey: 'User_ID',
            //     otherKey: 'Course_ID',
            //     onDelete: 'CASCADE',
            // });

            User.hasMany(models.Participating_Course, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });

            User.belongsToMany(models.Lesson, {
                through: 'Completed_Lesson',
                foreignKey: 'User_ID',
                otherKey: 'Lesson_ID',
                onDelete: 'CASCADE',
            });

            User.hasMany(models.Course, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    User.init(
        {
            User_ID: {
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
            Avatar: DataTypes.TEXT,
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
