"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      Region.hasMany(models.Advertisement, { foreignKey: "regionId" });
    }
  }

  Region.init(
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
      modelName: "Region",
    }
  );

  return Region;
};
