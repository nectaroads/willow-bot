const { PermissionsBitField } = require("discord.js");
const { noPermInteraction } = require("../../utils/success");

module.exports = (interaction, commandObject) => {
    if (commandObject.modOnly) {
        if (interaction.member.id === "349361725503700993" || interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator)) { }
        else {
            noPermInteraction(interaction);
            return true;
        }
    }
}