"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    static associate(models) {
      Advertisement.belongsTo(models.Region, { foreignKey: "regionId" });
      Advertisement.belongsTo(models.Brand, { foreignKey: "brandId" });
      Advertisement.belongsTo(models.CarModel, { foreignKey: "modelId" });
      Advertisement.hasMany(models.ChannelMessage, {
        foreignKey: "advertisementId",
      });
    }
  }

  Advertisement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      engineType: {
        type: DataTypes.ENUM("бензин", "дизель", "электро", "гибрид"),
        allowNull: false,
      },
      horsePower: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      driveType: {
        type: DataTypes.ENUM("полный", "задний", "передний"),
        allowNull: false,
      },
      transmission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telegramUsername: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isOnHold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hideReason: {
        type: DataTypes.ENUM("bot", "other", "just_hide"),
        allowNull: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Advertisement",
    }
  );

  return Advertisement;
};
