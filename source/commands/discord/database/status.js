const { SlashCommandBuilder } = require("discord.js");
const { getGuests, getOnline, getStatus, getCluster } = require("../../../services/servers/dontstarve");
const { wrapOnStatusEmbed, wrapOnSimpleEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Verifica o status do servidor.'),

    run: async ({ interaction }) => {

        const guests = getGuests();
        const online = getOnline();
        const status = getStatus();
        const cluster = getCluster();

        if (status == true) await wrapOnStatusEmbed(interaction, online, guests, cluster);
        else await wrapOnSimpleEmbed(interaction, "Servidor desligado.", "https://cdn.discordapp.com/attachments/1143675145043587123/1147664228057092157/KleiServer.png");
    }
}