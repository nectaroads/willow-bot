const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { readDontstarveUserByDontstarve, readDontstarveUserByDiscord } = require("../../../services/database/controller/dontstarve_user_controller");
const { readDiscordUser } = require("../../../services/database/controller/discord_user_controller");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Analisa o perfil de alguém')
        .addStringOption(option => option
            .setName("ku")
            .setDescription("KU ID.")
            .setRequired(false))
        .addUserOption(option => option
            .setName("usuario")
            .setDescription("Membro desejado.")
            .setRequired(false)),

    run: async ({ interaction }) => {
        const ku = interaction?.options?.getString("ku") ?? "";
        const user = interaction?.options?.getUser("usuario") ?? "";

        let target;
        let found = false;

        if (found != true) {
            if (ku != "") target = await readDontstarveUserByDontstarve(ku);
            else if (user != "") target = await readDontstarveUserByDiscord(user.id);
            else target = await readDontstarveUserByDiscord(interaction.user.id);
        }

        if (!target) return;

        let showBadges = "";
        let discord = await readDiscordUser(target.discordid);
        if (!discord) showBadges = "** **";
        else {
            const badges = discord.badges.split(";");
            for (i = 0; i < badges.length; i++) {
                switch (i) {
                    case 0: showBadges += badges[i] == 1 ? "`🐞 Tester`  " : ""; break;
                    case 1: showBadges += badges[i] == 1 ? "`🌷 Prestigioso`  " : ""; break;
                    case 2: showBadges += badges[i] == 1 ? "`🐲 Ancião`  " : ""; break;
                    case 3: showBadges += badges[i] == 1 ? "`🏆 Hall da Fama`  " : ""; break;
                    case 4: showBadges += badges[i] == 1 ? "`🪅 Evento`  " : ""; break;
                    case 5: showBadges += badges[i] == 1 ? "`🚀 Booster`  " : ""; break;
                    case 6: showBadges += badges[i] == 1 ? "`⭐️ VIP`  " : ""; break;
                    case 7: showBadges += badges[i] == 1 ? "`🤓 Travesso`  " : ""; break;
                    case 8: showBadges += badges[i] == 1 ? "`🧶 Helper`  " : ""; break;
                }
                if (i % 2 == 1) showBadges += "\n";
            }
        }

        if (showBadges == "") showBadges = "** **";

        const topEmbed = new EmbedBuilder()
            .setTitle("```                        ```  👤  ```                        ```")
            .setImage("https://cdn.discordapp.com/attachments/1143675145043587123/1146868751392833687/image.png")
            .setColor(0x2b2d31);

        const bodyEmbed = new EmbedBuilder()
            .addFields({
                name: "👤 Usuário**                                                **",
                value:
                    "`Username :` " + (target.username == "" ? target.dontstarveid : target.username) +
                    "\n`StarveKUI:` " + target.dontstarveid +
                    "\n`Jogou por:` " + (Math.round((target.time / 60) * 100) / 100).toFixed(1) + " horas." +
                    "\n`Oinkies  :` " + target.coins,
                inline: true,
            })
            .addFields({
                name: "🏅 Conquistas**                            **",
                value: showBadges,
                inline: true,
            })
            .setColor(0x2b2d31);

        const bottomEmbed = new EmbedBuilder()
            .addFields({
                name: "📋 Temporada 0",
                value: "`Pontuação:` " + Math.round((target.points * 100) / 100).toFixed(1) + "\n`Jogou por:` " + (Math.round((target.time / 60) * 100) / 100).toFixed(1) + " hrs.",
                inline: true,
            })
            .addFields({
                name: "📋 Temporada 1",
                value: "`Pontuação:` 0.0\n`Jogou por:` 0.0 hrs.",
                inline: true,
            })
            .addFields({
                name: "📋 Temporada 2",
                value: "`Pontuação:` 0.0\n`Jogou por:` 0.0 hrs.",
                inline: true,
            })
            .addFields({
                name: "```                                                            ```",
                value: "** **",
            })
            .setColor(0x2b2d31);

        interaction.reply({ embeds: [topEmbed, bodyEmbed, bottomEmbed] });
    }
}