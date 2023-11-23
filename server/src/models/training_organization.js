'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Training_Organization extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Training_Organization.hasMany(models.Course, {
                foreignKey: 'Organization_ID',
            });
        }
    }

    Training_Organization.init(
        {
            Training_Organization_ID: {
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
            Status: {
                type: DataTypes.STRING,
                defaultValue: '',
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Training_Organization',
        },
    );
    return Training_Organization;
};
