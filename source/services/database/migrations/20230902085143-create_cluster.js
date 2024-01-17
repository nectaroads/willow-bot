"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Clusters", {
      index: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      season: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0.0",
      },
      event: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "none",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Clusters");
  },
};
