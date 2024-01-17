const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");
require("dotenv").config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, "commands/discord"),
    eventsPath: path.join(__dirname, "events/discord"),
    validationsPath: path.join(__dirname, "commands/validations"),
    testServer: "1128103494306517072",
});

client.login(process.env.TOKEN);