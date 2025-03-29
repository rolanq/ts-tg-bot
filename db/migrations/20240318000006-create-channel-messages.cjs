"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ChannelMessages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      advertisementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Advertisements",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      messageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      channelId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("ChannelMessages", ["advertisementId"]);
    await queryInterface.addIndex("ChannelMessages", ["messageId"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ChannelMessages");
  },
};
