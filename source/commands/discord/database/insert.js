const { SlashCommandBuilder } = require("discord.js");
const { successInteraction } = require("../../../utils/success");
const { createStarveData } = require("../../../services/database/controller/dontstarve_data_controller");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("insert")
        .setDescription("Controle a pontuação do server Don't Starve!")
        .addStringOption(option => option
            .setName("vitima")
            .setDescription("Qual sistema vai manipular.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("name")
            .setDescription("Qual o nome?")
            .setRequired(true))
        .addStringOption(option => option
            .setName("prefab")
            .setDescription("Qual o prefab?")
            .setRequired(true))
        .addIntegerOption(option => option
            .setName("points")
            .setDescription("Quanto vale?")
            .setRequired(true)),

    run: async ({ interaction }) => {
        const victim = interaction.options.getString("vitima") ?? null;
        const name = interaction.options.getString("name") ?? null;
        const prefab = interaction.options.getString("prefab") ?? null;
        const points = interaction.options.getInteger("points") ?? null;

        await createStarveData(victim, name, prefab, points);
        await successInteraction(interaction);
    },

    modOnly: true,
}