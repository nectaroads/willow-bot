const { SlashCommandBuilder } = require("discord.js");
const { listStarveData } = require("../../../services/database/controller/dontstarve_data_controller");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Testa um comando.'),

    run: async ({ interaction }) => {
        interaction.reply("Executando.");
        recipes = await listStarveData("recipes");
        console.log(recipes);
    },

    modOnly: true,
}