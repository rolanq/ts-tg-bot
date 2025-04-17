import { CallbackQuery } from "@telegraf/types";
import { BOT_SETTINGS_EDIT_STATE, USER_STATE_ENUM } from "constants/config";
import { ADMIN_EDIT_BOT_SETTINGS_MESSAGES } from "constants/messages";
import { updateUser } from "services/User";
import { Context } from "telegraf";

export const handleEditBotSettings = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const [, action] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    switch (action) {
      case BOT_SETTINGS_EDIT_STATE.SUPPORT_USERNAME:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_SUPPORT_USERNAME,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.SUPPORT_USERNAME);
      case BOT_SETTINGS_EDIT_STATE.SUPPORT_TEXT:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_SUPPORT_TEXT,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.SUPPORT_TEXT);
      case BOT_SETTINGS_EDIT_STATE.WATERMARK:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_WATERMARK,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.WATERMARK);
    }
  } catch (error) {
    return;
  }
};
