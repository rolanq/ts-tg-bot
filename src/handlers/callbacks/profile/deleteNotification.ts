import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { Context } from "telegraf";
import { CallbackQuery } from "@telegraf/types";
import { deleteNotification } from "services/notification";

export const handleNotificationDelete = async (ctx: Context) => {
  try {
    const { callbackQuery, from } = ctx;

    if (!from) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const [, notificationId] = (
      callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    await deleteNotification(notificationId);

    await ctx.deleteMessage();

    return ctx.answerCbQuery(MESSAGES.NOTIFICATION_DELETED, {
      show_alert: true,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
