const { Model, DataTypes } = require("sequelize");

class DiscordUser extends Model {
    static init(sequelize) {
        super.init(
            {
                index: { type: DataTypes.INTEGER, primaryKey: true },
                discordid: DataTypes.STRING,
                flags: DataTypes.STRING,
                badges: DataTypes.STRING,
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

module.exports = DiscordUser;
