const { Model, DataTypes } = require("sequelize");

class DontstarveUser extends Model {
    static init(sequelize) {
        super.init(
            {
                index: { type: DataTypes.INTEGER, primaryKey: true },
                dontstarveid: DataTypes.STRING,
                discordid: DataTypes.STRING,
                username: DataTypes.STRING,
                points: DataTypes.FLOAT,
                coins: DataTypes.FLOAT,
                time: DataTypes.INTEGER,
                deaths: DataTypes.INTEGER,
                character: DataTypes.STRING,
                flags: DataTypes.STRING,
                pastpoints: DataTypes.STRING,
                pasttime: DataTypes.STRING,
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

module.exports = DontstarveUser;
