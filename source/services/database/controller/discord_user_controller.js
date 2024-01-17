const DiscordUser = require("../../../models/DiscordUser")

module.exports = {
    async createDiscordUser(discordid) {
        const object = await DiscordUser.findOne({ where: { discordid } });
        if (!object) DiscordUser.create({ discordid, badges: "1;" });
    },

    async readDiscordUser(discordid) {
        const object = await DiscordUser.findOne({ where: { discordid } });
        if (object) return object;
    }
}