import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { sendAdToChannel } from "handlers/common/channelMessage";
import { getWhereConditionForNotifications } from "handlers/common/createWhereCondition";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { createAdvertisement } from "services/advertisment";
import {
  dropAdvertisementDraft,
  getAdvertisementDraft,
} from "services/advertismentDraft";
import { getNotifications } from "services/notification";
import { getUser, updateUser } from "services/User";
import { Telegraf } from "telegraf";
import {
  formatAdvertisementMedia,
  validateAdvertisementDraft,
} from "utils/utils";

export const registerAdPublishCallbacks = async (bot: Telegraf) => {
  bot.action("publish_ad", async (ctx) => {
    try {
      if (!ctx.from?.id) {
        return ctx.reply(ERROR_MESSAGES.ERROR, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const user = await getUser(ctx.from.id.toString());

      if (!user) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      // if (user.availableListings === 0) {
      //   return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_LISTING, {
      //     reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      //   });
      // }

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const isValidAd = validateAdvertisementDraft(draft);

      if (!isValidAd) {
        return ctx.reply(ERROR_MESSAGES.ERROR_NEED_MORE_INFO, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const ad = await createAdvertisement(draft);

      const result = await sendAdToChannel(bot, ad);

      if (!result) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_CHANNEL_MESSAGE, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const whereCondition = getWhereConditionForNotifications(ad);

      const notifications = await getNotifications(
        ctx.from.id.toString(),
        whereCondition
      );

      notifications.forEach(async () => {
        const { text, media } = await formatAdvertisementMedia(ad);

        if (media) {
          const mediaGroup = await ctx.sendMediaGroup(media);
          const keyboard = CLOSE_BUTTONS(mediaGroup[0].message_id);
          await ctx.reply(MESSAGES.AD_ACTIONS, {
            reply_markup: {
              inline_keyboard: keyboard,
            },
          });
        } else if (text) {
          await ctx.reply(
            MESSAGES.NEW_CAR_IN_YOUR_SEARCH.replace("{advertisement}", text),
            {
              reply_markup: {
                inline_keyboard: CLOSE_BUTTONS(),
              },
            }
          );
        }
      });

      await dropAdvertisementDraft(ctx.from?.id.toString());

      await updateUser(ctx.from.id.toString(), {
        state: USER_STATE_ENUM.MENU,
        // availableListings: user.availableListings - 1,
      });

      await ctx.deleteMessage();

      await ctx.reply(MESSAGES.AD_PUBLISHED);
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
