"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Создание таблицы регионов
    await queryInterface.createTable("Regions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

    // Создание таблицы брендов
    await queryInterface.createTable("Brands", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

    // Создание таблицы моделей
    await queryInterface.createTable("CarModels", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      name: {
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

    // Создание таблицы объявлений
    await queryInterface.createTable("Advertisements", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Regions",
          key: "id",
        },
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      modelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CarModels",
          key: "id",
        },
      },
      engineType: {
        type: Sequelize.ENUM("бензин", "дизель", "электро", "гибрид"),
        allowNull: false,
      },
      engineVolume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      horsePower: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      driveType: {
        type: Sequelize.ENUM("полный", "задний", "передний"),
        allowNull: false,
      },
      transmission: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mileage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telegramUsername: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

    // Создание таблицы сохраненных поисков
    await queryInterface.createTable("SavedSearches", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      modelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CarModels",
          key: "id",
        },
      },
      engineType: {
        type: Sequelize.ENUM("бензин", "дизель", "электро", "гибрид"),
        allowNull: true,
      },
      engineVolumeMin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      engineVolumeMax: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      horsePowerMin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      horsePowerMax: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      driveType: {
        type: Sequelize.ENUM("полный", "задний", "передний"),
        allowNull: true,
      },
      transmission: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearMin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearMax: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mileageMin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mileageMax: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      notificationsEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SavedSearches");
    await queryInterface.dropTable("Advertisements");
    await queryInterface.dropTable("CarModels");
    await queryInterface.dropTable("Brands");
    await queryInterface.dropTable("Regions");
  },
};
