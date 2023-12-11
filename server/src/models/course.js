'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Course.belongsTo(models.User, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });

            Course.belongsTo(models.Category, {
                foreignKey: 'Category_ID',
                onDelete: 'CASCADE',
            });

            // Course.belongsToMany(models.User, {
            //     through: 'Participating_Course',
            //     foreignKey: 'Course_ID',
            //     otherKey: 'User_ID',
            //     onDelete: 'CASCADE',
            // });
            Course.hasMany(models.Participating_Course, {
                foreignKey: 'Course_ID',
                onDelete: 'CASCADE',
            });

            Course.hasMany(models.Week, {
                foreignKey: 'Course_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Course.init(
        {
            Course_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            User_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Category_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Level: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Need_Approval: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Course',
        },
    );
    return Course;
};
