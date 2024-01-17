const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recipes')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "recipes",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146850809204711555/image.png",
            "🥗",
            "Culinária."
        );
    }
}