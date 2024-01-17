"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("DontstarveUsers", {
      index: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      dontstarveid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ID",
      },
      discordid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ID",
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      points: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      coins: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deaths: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      character: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "none",
      },
      flags: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0;",
      },
      pastpoints: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0;",
      },
      pasttime: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0;",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("DontstarveUsers");
  },
};
