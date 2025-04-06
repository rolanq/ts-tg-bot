"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {}
  }

  Notification.init(
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
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      priceTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "Notifications",
    }
  );

  return Notification;
};
