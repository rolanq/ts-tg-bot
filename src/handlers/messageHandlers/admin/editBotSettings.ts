import { Message } from "@telegraf/types";
import { BOT_SETTINGS_EDIT_STATE } from "constants/config";
import { ADMIN_MESSAGES, MESSAGES } from "constants/messages";
import { updateBotSettings } from "services/botSettings";
import { Context } from "telegraf";

export const handleEditBotSettings = async (
  ctx: Context,
  action: BOT_SETTINGS_EDIT_STATE
) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;

    if (action === BOT_SETTINGS_EDIT_STATE.SUPPORT_USERNAME) {
      await updateBotSettings({ SupportUsername: text.replace("@", "") });
    }

    if (action === BOT_SETTINGS_EDIT_STATE.SUPPORT_TEXT) {
      await updateBotSettings({ SupportText: text });
    }

    if (action === BOT_SETTINGS_EDIT_STATE.WATERMARK) {
      await updateBotSettings({ WatermarkText: text });
    }

    return ctx.reply(ADMIN_MESSAGES.BOT_SETTINGS_UPDATED);
  } catch (error) {
    return;
  }
};
