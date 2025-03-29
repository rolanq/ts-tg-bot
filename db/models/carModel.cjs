"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarModel extends Model {
    static associate(models) {
      CarModel.belongsTo(models.Brand, { foreignKey: "brandId" });
      CarModel.hasMany(models.Advertisement, { foreignKey: "modelId" });
    }
  }

  CarModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CarModel",
    }
  );

  return CarModel;
};
