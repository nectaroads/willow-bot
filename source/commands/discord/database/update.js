const { SlashCommandBuilder } = require("discord.js");
const { updateCluster } = require("../../../services/database/controller/cluster_controller");
const { successInteraction } = require("../../../utils/success");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("Atualiza o servidor.")
        .addIntegerOption(option => option
            .setName("season")
            .setDescription("Season atual.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("versao")
            .setDescription("Em qual versão o servidor está entrando.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("evento")
            .setDescription("'none' caso nenhum.")
            .setRequired(true)),

    run: async ({ interaction }) => {
        const season = interaction.options.getInteger("season");
        const version = interaction.options.getString("versao");
        const event = interaction.options.getString("evento");

        await updateCluster(season, version, event);
        successInteraction(interaction);
    },

    modOnly: true,
}