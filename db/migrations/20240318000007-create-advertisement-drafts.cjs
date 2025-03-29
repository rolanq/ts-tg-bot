"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdvertisementDrafts", {
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
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      engineType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      horsePower: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mileage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telegramUsername: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      driveType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transmission: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: true,
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
      modelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CarModels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      currentStep: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "initial",
      },
      expiresAt: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex("AdvertisementDrafts", ["userId"]);
    await queryInterface.addIndex("AdvertisementDrafts", ["expiresAt"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AdvertisementDrafts");
  },
};
