'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Participating_Course extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ ở đây
        }
    }

    Participating_Course.init(
        {
            Student_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Course_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Review_Content: {
                type: DataTypes.STRING,
            },
            Review_Star: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            Date_Achieved: {
                type: DataTypes.DATE,
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Participating_Course',
        },
    );
    return Participating_Course;
};
