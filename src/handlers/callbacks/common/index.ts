import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES } from "constants/messages";
import { Telegraf } from "telegraf";

export const registerCommonCallbacks = (bot: Telegraf) => {
  bot.action(/^close_message/, async (ctx) => {
    try {
      const { callbackQuery } = ctx;

      if (!callbackQuery) {
        return;
      }
      const data = (callbackQuery as CallbackQuery.DataQuery).data;
      const [, messageId] = data.split(":");

      if (messageId) {
        await ctx.deleteMessage(Number(messageId));
      }
      await ctx.deleteMessage();
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
