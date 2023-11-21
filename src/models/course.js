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
            Course.belongsTo(models.Training_Organization, {
                foreignKey: 'Organization_ID',
            });

            Course.belongsTo(models.Category, {
                foreignKey: 'Category_ID',
            });

            Course.belongsToMany(models.Student, {
                through: 'Participating_Course',
                foreignKey: 'Course_ID',
                otherKey: 'Student_ID',
            });

            Course.hasMany(models.Week, {
                foreignKey: 'Course_ID',
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
            Organization_ID: {
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
                type: DataTypes.STRING,
                allowNull: false,
            },
            Level: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isNeedReview: {
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
