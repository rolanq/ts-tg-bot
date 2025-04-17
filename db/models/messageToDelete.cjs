"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MessageToDelete extends Model {
    static associate(models) {
    }
  }

  MessageToDelete.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      messagesToDelete: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "MessageToDelete",
      tableName: "MessagesToDelete",
    }
  );

  return MessageToDelete;
};
