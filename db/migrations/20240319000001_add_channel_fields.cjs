"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Advertisements", "channelMessageId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Advertisements", "channelText", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Advertisements", "channelStatus", {
      type: Sequelize.ENUM("active", "sold", "deposit"),
      defaultValue: "active",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Advertisements", "channelMessageId");
    await queryInterface.removeColumn("Advertisements", "channelText");
    await queryInterface.removeColumn("Advertisements", "channelStatus");
  },
};
