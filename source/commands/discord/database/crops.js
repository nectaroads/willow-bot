const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crops')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "crops",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146814769018437713/bg_loading_loading_farming2.png",
            "🍅",
            "Colheita."
        );
    }
}