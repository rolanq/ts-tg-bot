"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BotSettings extends Model {
    static associate(models) {
      // определение ассоциаций может быть здесь
    }
  }

  BotSettings.init(
    {
      WatermarkText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SupportUsername: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SupportText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BotSettings",
      tableName: "botsettings",
    }
  );

  return BotSettings;
};
