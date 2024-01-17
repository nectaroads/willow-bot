const { listAndRankDontstarveUsers } = require("../../../services/database/controller/dontstarve_user_controller");
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Analisa o leaderboard do server.'),

    run: async ({ interaction }) => {

        const object = await listAndRankDontstarveUsers();

        let firstColumn = "";
        let secondColumn = "";
        let emoji = "";

        for (i = 0; i < object.length; i++) {
            switch (i) {
                case 0: emoji = "🥇 "; break;
                case 1: emoji = "🥈 "; break;
                case 2: emoji = "🥉 "; break;
                default: emoji = "👤 "; break;
            }
            firstColumn += emoji + (object[i].username == "" ? object[i].dontstarveid : object[i].username) + ": " + object[i].points + " pts.\n";
            if (i > 3) break;
        }
        if (firstColumn == "") firstColumn = "** **";

        for (i = 5; i < object.length; i++) {
            secondColumn += "👤 " + (object[i].username == "" ? object[i].dontstarveid : object[i].username) + ": " + object[i].points + " pts.\n";
        }
        if (secondColumn == "") secondColumn = "** **";

        const topEmbed = new EmbedBuilder()
            .setTitle("```                        ```  🏆  ```                        ```")
            .setImage("https://cdn.discordapp.com/attachments/1143675145043587123/1146868751392833687/image.png")
            .setColor(0x2b2d31);

        const bottomEmbed = new EmbedBuilder()
            .addFields({
                name: "📋 `Leaderboard: Top 05`",
                value: firstColumn,
                inline: true,
            })
            .addFields({
                name: "📋 `Leaderboard: Top 10`",
                value: secondColumn,
                inline: true,
            })
            .addFields({
                name: "```                                                            ```",
                value: "** **",
            })
            .setColor(0x2b2d31);

        interaction.reply({ embeds: [topEmbed, bottomEmbed] });
    }
}