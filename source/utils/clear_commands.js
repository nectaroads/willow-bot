const { REST, Routes } = require('discord.js');
require("dotenv").config();

const rest = new REST().setToken(process.env.TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands("1128101011312099420", "1128103494306517072"), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands("1128101011312099420"), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);