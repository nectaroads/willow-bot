const { spawnDontstarveServer } = require("../../../services/servers/dontstarve");
const { SlashCommandBuilder } = require("discord.js");
const { successInteraction } = require("../../../utils/success");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("execute")
        .setDescription("Ligo o servidor."),

    run: async ({ interaction }) => {
        await spawnDontstarveServer(interaction);
        if (interaction) successInteraction(interaction);
    },

    modOnly: true,
}