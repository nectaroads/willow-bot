const { readDontstarveUserByDontstarve } = require("../services/database/controller/dontstarve_user_controller");
const { EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const { getIcon } = require("./get_icon");
const { listStarveData } = require("../services/database/controller/dontstarve_data_controller");

module.exports = {
    wrapOnSimpleEmbed(interaction, text, icon) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: text, iconURL: icon, })
            .setColor(0x2b2d31);
        interaction.reply({ embeds: [embed] });
    },

    wrapOnSendSimpleEmbed(channel, text, icon) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: text, iconURL: icon, })
            .setColor(0x2b2d31);
        channel.send({ embeds: [embed] });
    },

    async wrapOnUserAnnouncementEmbed(channel, title, member, action, food, points, image) {
        const embed = new EmbedBuilder()
            .setDescription(`**${title}**\n${member} está ${action} ${food}.\nTodos presentes ganharam ${points} pontos!`)
            .setThumbnail(image)
            .setColor(0x2b2d31);

        channel.send({ embeds: [embed] });
    },

    async wrapOnSimpleEmbed2(channel, body, image) {
        const embed = new EmbedBuilder()
            .setDescription(body)
            .setThumbnail(image)
            .setColor(0x2b2d31);

        channel.send({ embeds: [embed] });
    },

    async wrapOnShardAnnouncementEmbed(interaction, title, description, header, image) {
        const channel = await interaction.client.channels.fetch(config.DONTSTARVECHAT);

        const embed = new EmbedBuilder()
            .setDescription(`**${title}**\n${description}\n${header}`)
            .setThumbnail(image)
            .setColor(0x2b2d31);

        channel.send({ embeds: [embed] });
    },

    async wrapOnStatusEmbed(interaction, users, ever, cluster) {
        let members = "";
        let missing = "";
        let index = 0;

        for (i = 1; i < users.length; i++) {
            const data = await readDontstarveUserByDontstarve(users[i].ku);
            const icon = getIcon(data.character);
            members += icon + " " + users[i].name + "\n";
        }

        let trigger = false;
        for (i = 1; i < ever.length; i++) {
            for (y = 1; y < users.length; y++) {
                if (ever[i].name == users[y].name) trigger = true;
            }
            if (trigger == false) {
                const data = await readDontstarveUserByDontstarve(ever[i].ku);
                const icon = getIcon(data.character);
                missing += icon + " " + ever[i].name + "\n";
                index++;
                if (index >= 6) break;
            }
            trigger = false;
        }

        const topEmbed = new EmbedBuilder()
            .setTitle("```                        ```  🎮  ```                         ```")
            .setImage("https://cdn.discordapp.com/attachments/1143675145043587123/1147157561414533193/image.png")
            .setColor(0x2b2d31);

        const bodyEmbed = new EmbedBuilder()
            .addFields({
                name: "`00. Membros Online`",
                value: members == "" ? "Ninguém Online." : members,
                inline: true,
            })
            .addFields({
                name: "`00. Visitantes`",
                value: missing == "" ? "Nenhuma visita..." : missing,
                inline: true,
            })
            .addFields({
                name: "`00. Informações`",
                value: `\`Season:\` ${cluster.season}\n\`Evento:\` ${cluster.event}\n\`Versão:\` ${cluster.version}\n`,
                inline: true,
            })
            .addFields({
                name: "```                                                             ```",
                value: "** **",
            })
            .setColor(0x2b2d31);

        interaction.reply({ embeds: [topEmbed, bodyEmbed] });
    },

    async wrapOnPointsEmbed(interaction, type, image, icon, title) {
        const json = await listStarveData(type);
        var column = ["", ""];
        var trigger = 0;

        for (i = 0; i < json.length; i++) {
            if (trigger == 0) {
                column[0] += "`" + json[i].points + ".` " + json[i].name + "\n";
                trigger = 1;
            }
            else {
                column[1] += "`" + json[i].points + ".` " + json[i].name + "\n";
                trigger = 0;
            }
        }

        const topEmbed = new EmbedBuilder()
            .setTitle("```                        ```  " + icon + "  ```                         ```")
            .setImage(image)
            .setColor(0x2b2d31);

        const bodyEmbed = new EmbedBuilder()
            .addFields({
                name: "`00. " + title + "`",
                value: column[0],
                inline: true,
            })
            .addFields({
                name: "`00. " + title + "`",
                value: column[1],
                inline: true,
            })
            .addFields({
                name: "```                                                              ```",
                value: "** **",
            })
            .setColor(0x2b2d31);

        interaction.reply({ embeds: [topEmbed, bodyEmbed] })
    },

}