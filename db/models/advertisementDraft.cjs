"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AdvertisementDraft extends Model {
    static associate(models) {}
  }

  AdvertisementDraft.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      engineType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      horsePower: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      driveType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transmission: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telegramUsername: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      autotekaLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      currentStep: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "AdvertisementDraft",
      tableName: "AdvertisementDrafts",
    }
  );

  return AdvertisementDraft;
};
