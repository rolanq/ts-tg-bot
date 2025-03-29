"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Удаление колонки engineVolume из таблицы Advertisements
    await queryInterface.removeColumn("Advertisements", "engineVolume");

    // Удаление колонок engineVolumeMin и engineVolumeMax из таблицы SavedSearches
    await queryInterface.removeColumn("SavedSearches", "engineVolumeMin");
    await queryInterface.removeColumn("SavedSearches", "engineVolumeMax");
  },

  async down(queryInterface, Sequelize) {
    // Возвращаем колонку engineVolume в таблицу Advertisements
    await queryInterface.addColumn("Advertisements", "engineVolume", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 2.0,
    });

    // Возвращаем колонки engineVolumeMin и engineVolumeMax в таблицу SavedSearches
    await queryInterface.addColumn("SavedSearches", "engineVolumeMin", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("SavedSearches", "engineVolumeMax", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },
};
