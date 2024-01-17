const { EmbedBuilder } = require("discord.js");
const config = require('../../../../config.json');

module.exports = async (member) => {
    const channel = await member.client.channels.fetch(config.WELCOMECHAT);

    const embed = new EmbedBuilder()
        .setAuthor({ name: member.user.globalName, iconURL: member.displayAvatarURL(), })
        .setTitle("Adeus")
        .setDescription("<@" + member.user + "> saiu do servidor!\nAgora temos " + (member.guild.memberCount) + " membros.")
        .setThumbnail("https://cdn.discordapp.com/attachments/1143675145043587123/1147796890461683852/leftserver.png")
        .setColor(0x2b2d31);

    channel.send({ embeds: [embed] });
}