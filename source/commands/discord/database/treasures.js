const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('treasures')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "treasures",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146851273753231421/image.png",
            "🃏",
            "Tesouros."
        );
    }
}