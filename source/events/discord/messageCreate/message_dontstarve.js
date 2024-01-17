const { getServer } = require("../../../services/servers/dontstarve");

module.exports = async (message) => {
    if (message.channel.id === "1143974246561882183") {
        if(message.author.bot) return;
        const msg = message.content.toString().replace("\n", " ")
        getServer().stdin.write(`c_announce('[Discord] ${message.author.username.charAt(0).toUpperCase() + message.author.username.slice(1)}: ${message.content.toString().slice(0, 1000)}')\n`);
    }
}
