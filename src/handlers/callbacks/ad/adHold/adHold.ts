import { CallbackQuery } from "@telegraf/types";
import { AD_ACTIONS_BUTTONS, CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { editAdInChannel } from "handlers/common/channelMessage";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import {
  getAdvertisementById,
  updateAdvertisement,
} from "services/advertisment";
import { Context, Telegraf } from "telegraf";

const handleAdOnHold = async (ctx: Context, bot: Telegraf) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const [, action, adId, messageId] = (
      callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    if (!adId) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const ad = await getAdvertisementById(adId);

    if (!ad || !ad.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const updatedAd = await updateAdvertisement(adId, {
      isOnHold: action === "set" ? true : false,
    });

    if (!updatedAd || !updatedAd.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const result = await editAdInChannel(bot, updatedAd);

    if (!result) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_EDIT_CHANNEL_MESSAGE, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const message = await renderAdvertismentMessage(updatedAd);

    if (updatedAd.photos.length) {
      await bot.telegram.editMessageCaption(
        ctx.chat?.id,
        Number(messageId),
        undefined,
        message,
      );
      const keyboard = AD_ACTIONS_BUTTONS(updatedAd, Number(messageId));

      await ctx.editMessageText(MESSAGES.AD_ACTIONS, {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      });
    } else {
      await ctx.editMessageText(message, {
        reply_markup: {
          inline_keyboard: AD_ACTIONS_BUTTONS(updatedAd),
        },
      });
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

export const registerAdHoldCallbacks = (bot: Telegraf) => {
  bot.action(/^ad_on_hold:/, (ctx) => handleAdOnHold(ctx, bot));
};
