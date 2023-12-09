'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Note.belongsTo(models.Lesson, {
                foreignKey: 'Lesson_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Note.init(
        {
            Note_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Lesson_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Note_Content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Note',
        },
    );

    return Note;
};
