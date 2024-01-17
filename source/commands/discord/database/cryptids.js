const { SlashCommandBuilder } = require("discord.js");
const { wrapOnPointsEmbed } = require("../../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cryptids')
        .setDescription('Envio a tabela de pontos!'),
    run: ({ interaction }) => {
        wrapOnPointsEmbed(
            interaction,
            "cryptids",
            "https://cdn.discordapp.com/attachments/1143675145043587123/1146850543281651842/image.png",
            "🐌",
            "Criaturas raras."
        );
    }
}