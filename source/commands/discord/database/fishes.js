const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fishes')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "fishes",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146851097928007833/image.png",
            "🐟",
            "Peixes."
        );
    }
}