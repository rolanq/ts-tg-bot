"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Проверяем, существует ли уже столбец hideReason
    const tableInfo = await queryInterface.describeTable("Advertisements");

    if (!tableInfo.hideReason) {
      // Если столбца нет, добавляем его
      await queryInterface.addColumn("Advertisements", "hideReason", {
        type: Sequelize.ENUM("bot", "other", "just_hide"),
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Удаляем столбец, если он существует
    const tableInfo = await queryInterface.describeTable("Advertisements");

    if (tableInfo.hideReason) {
      await queryInterface.removeColumn("Advertisements", "hideReason");
    }
  },
};
