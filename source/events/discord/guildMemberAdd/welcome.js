const { EmbedBuilder } = require("discord.js");
const config = require('../../../../config.json');
const { createDiscordUser } = require("../../../services/database/controller/discord_user_controller");

module.exports = async (member) => {
    const channel = await member.client.channels.fetch(config.WELCOMECHAT);

    const embed = new EmbedBuilder()
        .setAuthor({ name: member.user.globalName, iconURL: member.displayAvatarURL(), })
        .setTitle("Boas vindas")
        .setDescription("<@" + member.user + "> juntou-se ao servidor!\nEle/a é o " + member.guild.memberCount + "° membro.")
        .setThumbnail("https://cdn.discordapp.com/attachments/1143675145043587123/1147796890772045894/joinserver.png")
        .setColor(0x2b2d31);

    channel.send({ embeds: [embed] });

    createDiscordUser(member.user.id);
}