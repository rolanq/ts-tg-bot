import { BotSettings, IBotSettings } from "utils/db";

export const getBotSettings = async () => {
  const botSettings = await BotSettings.findOne();
  return botSettings?.get({ plain: true });
};

export const updateBotSettings = async (botSettings: Partial<IBotSettings>) => {
  const bot = await BotSettings.findOne();

  if (bot) {
    await bot.update(botSettings);

    return bot.get({ plain: true });
  } else {
    const newBotSettings = await BotSettings.create({
      SupportText: botSettings.SupportText || "",
      SupportUsername: botSettings.SupportUsername || "",
      WatermarkText: botSettings.WatermarkText || process.env.BOT_TITLE || "",
    });

    return newBotSettings.get({ plain: true });
  }
};
