"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ChannelMessages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      channelId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      messageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Добавляем уникальный составной индекс
    await queryInterface.addIndex(
      "ChannelMessages",
      ["advertisementId", "channelId", "messageId"],
      {
        unique: true,
        name: "channel_message_unique_index",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ChannelMessages");
  },
};
