const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bosses')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "bosses",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146850717664026734/image.png",
            "🐲",
            "Chefes."
        );
    }
}