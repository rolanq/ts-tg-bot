import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { deleteAllNotifications } from "services/notification";
import { Context } from "telegraf";

export const handleDeleteAllNotifications = async (ctx: Context) => {
  try {
    const { from } = ctx;
    

    if (!from) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
    
    await deleteAllNotifications(from.id.toString());

    await ctx.deleteMessage();

    return ctx.answerCbQuery(MESSAGES.NOTIFICATION_DELETED_ALL, {
      show_alert: true,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
