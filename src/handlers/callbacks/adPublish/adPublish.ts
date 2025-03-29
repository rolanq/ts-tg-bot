import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import {
  createAdvertisement,
  dropAdvertisementDraft,
  getAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";
import { validateAdvertisementDraft } from "utils/utils";

export const registerAdPublishCallbacks = async (bot: Telegraf) => {
  bot.action("publish_ad", async (ctx) => {
    try {
      if (!ctx.from?.id) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT);
      }

      const isValidAd = validateAdvertisementDraft(draft);

      if (!isValidAd) {
        return ctx.reply(ERROR_MESSAGES.ERROR_NEED_MORE_INFO);
      }

      await createAdvertisement(draft);

      await dropAdvertisementDraft(ctx.from?.id.toString());

      await ctx.deleteMessage();

      await ctx.reply(MESSAGES.AD_PUBLISHED);
    } catch (error) {
      console.log(error);

      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });
};
