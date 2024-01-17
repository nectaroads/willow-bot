const { Model, DataTypes } = require("sequelize");

class Tests extends Model {
    static init(sequelize) {
        super.init(
            {
                index: { type: DataTypes.INTEGER, primaryKey: true },
                array: DataTypes.STRING,
            },
            {
                sequelize,
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        );
    }
}

module.exports = Tests;
