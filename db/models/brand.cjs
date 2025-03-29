"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.CarModel, { foreignKey: "brandId" });
      Brand.hasMany(models.Advertisement, { foreignKey: "brandId" });
    }
  }

  Brand.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );

  return Brand;
};
