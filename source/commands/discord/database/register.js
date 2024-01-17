const { SlashCommandBuilder } = require("discord.js");
const { successInteraction } = require("../../../utils/success");
const { createDiscordUser } = require("../../../services/database/controller/discord_user_controller");
const { createDontstarveUserOnDiscord } = require("../../../services/database/controller/dontstarve_user_controller");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Atualiza o servidor.")
        .addStringOption(option => option
            .setName("ku")
            .setDescription("O seu KU ID")
            .setRequired(true)),

    run: ({ interaction }) => {
        const ku = interaction.options.getString("ku");

        if (ku.length == 11 && ku.startsWith("KU_")) {
            createDiscordUser(interaction.user.id);
            createDontstarveUserOnDiscord(ku, interaction.user.id);
            successInteraction(interaction);
        }
    },
}