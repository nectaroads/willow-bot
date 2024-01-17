"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("DiscordUsers", {
      index: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      discordid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ID",
      },
      flags: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0;",
      },
      badges: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0;",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("DiscordUsers");
  },
};
