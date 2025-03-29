"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SavedSearch extends Model {
    static associate(models) {
      // определяем связи здесь если нужно
    }
  }

  SavedSearch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      priceMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      priceMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      engineType: {
        type: DataTypes.ENUM("бензин", "дизель", "электро", "гибрид"),
        allowNull: true,
      },
      horsePowerMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      horsePowerMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      driveType: {
        type: DataTypes.ENUM("полный", "задний", "передний"),
        allowNull: true,
      },
      transmission: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      yearMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mileageMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mileageMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      notificationsEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "SavedSearch",
    }
  );

  return SavedSearch;
};
