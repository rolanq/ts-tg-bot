import { ADMIN_BOT_SETTINGS_BUTTONS } from "constants/buttons/buttons";
import { ADMIN_BOT_SETTINGS_MESSAGE } from "constants/messages";
import { getBotSettings } from "services/botSettings";
import { getAdmins } from "services/User";
import { Context } from "telegraf";

export const handleBotSettings = async (ctx: Context) => {
  try {
    const botSettings = await getBotSettings();
    if (!botSettings) {
      return;
    }

    const admins = await getAdmins();

    const message = ADMIN_BOT_SETTINGS_MESSAGE(admins, botSettings);

    return ctx.reply(message, {
      reply_markup: { inline_keyboard: ADMIN_BOT_SETTINGS_BUTTONS },
    });
  } catch (error) {
    return;
  }
};
