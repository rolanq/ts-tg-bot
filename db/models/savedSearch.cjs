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
      priceFrom: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
      },
      priceTo: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SavedSearch",
    }
  );

  return SavedSearch;
};
