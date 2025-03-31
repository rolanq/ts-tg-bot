import { CallbackQuery } from "@telegraf/types";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getAdvertisementById } from "services/advertisment";
import { Telegraf } from "telegraf";

export const adHide = async (bot: Telegraf) => {
  bot.action(/^hide_ad:(.*)/, async (ctx) => {
    try {
      const { callbackQuery } = ctx;

      if (!callbackQuery || !ctx.from?.id) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const adId = (callbackQuery as CallbackQuery.DataQuery).data.split(
        ":"
      )[1];

      if (!adId) {
        return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
      }

      const ad = await getAdvertisementById(adId);

      if (!ad) {
        return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
      }

      await ctx.deleteMessage();

      return ctx.reply(MESSAGES.AD_HIDDEN);
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });
};
