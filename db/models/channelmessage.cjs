"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChannelMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Связь с объявлением
      ChannelMessage.belongsTo(models.Advertisement, {
        foreignKey: "advertisementId",
      });
    }
  }
  ChannelMessage.init(
    {
      advertisementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Advertisements",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ChannelMessage",
      indexes: [
        {
          unique: true,
          fields: ["advertisementId", "channelId", "messageId"],
        },
      ],
    }
  );
  return ChannelMessage;
};
