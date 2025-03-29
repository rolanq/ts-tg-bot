"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("SavedSearches", "priceMin", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("SavedSearches", "priceMax", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("SavedSearches", "priceMin");
    await queryInterface.removeColumn("SavedSearches", "priceMax");
  },
};
