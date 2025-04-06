"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Regions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Brands",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      priceFrom: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      priceTo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
