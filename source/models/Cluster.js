const { Model, DataTypes } = require("sequelize");

class Cluster extends Model {
    static init(sequelize) {
        super.init(
            {
                index: { type: DataTypes.INTEGER, primaryKey: true },
                season: DataTypes.INTEGER,
                version: DataTypes.STRING,
                event: DataTypes.STRING,
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

module.exports = Cluster;
