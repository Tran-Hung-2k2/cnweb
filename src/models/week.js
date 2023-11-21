'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Week extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Week.belongsTo(models.Course, {
                foreignKey: 'Course_ID',
            });

            Week.hasMany(models.Lecture, {
                foreignKey: 'Week_ID',
            });
        }
    }

    Week.init(
        {
            Week_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Course_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Week_Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Week_Description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Target: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Week',
        },
    );
    return Week;
};
