import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { USER_STATE_ENUM } from "constants/userState";
import { sendAdToChannel } from "handlers/common/channelMessage";
import { createAdvertisement } from "services/advertisment";
import {
  dropAdvertisementDraft,
  getAdvertisementDraft,
} from "services/advertismentDraft";
import { getUser, updateUser } from "services/User";
import { Telegraf } from "telegraf";
import { validateAdvertisementDraft } from "utils/utils";

export const registerAdPublishCallbacks = async (bot: Telegraf) => {
  bot.action("publish_ad", async (ctx) => {
    try {
      if (!ctx.from?.id) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const user = await getUser(ctx.from.id.toString());

      if (!user) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
      }

      if (user.availableListings === 0) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_LISTING);
      }

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT);
      }

      const isValidAd = validateAdvertisementDraft(draft);

      if (!isValidAd) {
        return ctx.reply(ERROR_MESSAGES.ERROR_NEED_MORE_INFO);
      }

      const ad = await createAdvertisement(draft);

      const result = await sendAdToChannel(bot, ad);

      if (!result) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_CHANNEL_MESSAGE);
      }

      await dropAdvertisementDraft(ctx.from?.id.toString());

      await updateUser(ctx.from.id.toString(), {
        state: USER_STATE_ENUM.MENU,
        availableListings: user.availableListings - 1,
      });

      await ctx.deleteMessage();

      await ctx.reply(MESSAGES.AD_PUBLISHED);
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });
};
