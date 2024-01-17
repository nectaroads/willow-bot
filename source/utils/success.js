const { wrapOnSimpleEmbed } = require("./embeds")

module.exports = {
    successInteraction(interaction) {
        wrapOnSimpleEmbed(interaction, "Sucesso!", "https://cdn.discordapp.com/attachments/1143675145043587123/1147667808294031431/tile130.png");
    },

    failInteraction(interaction) {
        wrapOnSimpleEmbed(interaction, "Houve um erro!", "https://cdn.discordapp.com/attachments/1143675145043587123/1143933747113234603/image.png");
    },

    noPermInteraction(interaction) {
        wrapOnSimpleEmbed(interaction, "Sem permissão", "https://cdn.discordapp.com/attachments/1143675145043587123/1143931330334298112/image.png");
    },
}