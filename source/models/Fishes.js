const { Model, DataTypes } = require("sequelize");

class Fishes extends Model {
    static init(sequelize) {
        super.init(
            {
                index: { type: DataTypes.INTEGER, primaryKey: true },
                prefab: DataTypes.STRING,
                name: DataTypes.STRING,
                points: DataTypes.INTEGER,
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

module.exports = Fishes;
