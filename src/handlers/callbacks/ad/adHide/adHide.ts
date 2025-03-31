import { CallbackQuery } from "@telegraf/types";
import {
  CONFIRM_HIDE_AD_BUTTONS,
  HIDE_AD_REASON_BUTTONS,
} from "constants/buttons/buttons";
import { HIDE_REASONS } from "constants/config";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { editAdInChannel } from "handlers/common/channelMessage";
import {
  getAdvertisementById,
  updateAdvertisement,
} from "services/advertisment";
import { Context, Telegraf } from "telegraf";

const adHide = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const [, adId, messageId] = (
      callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    if (!adId) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    const ad = await getAdvertisementById(adId);

    if (!ad) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.AD_HIDDEN_CONFIRMATION, {
      reply_markup: { inline_keyboard: CONFIRM_HIDE_AD_BUTTONS(adId, Number(messageId)) },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};

const confirmAdHide = async (ctx: Context, bot: Telegraf) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const [, adId, messageId] = (
      callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    if (!adId) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    const ad = await getAdvertisementById(adId);

    if (!ad) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }
    await ctx.deleteMessage(Number(messageId));
    await ctx.deleteMessage();

    const updatedAd = await updateAdvertisement(adId, {
      isActive: false,
    });

    if (!updatedAd || !updatedAd.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }
    
    const result = await editAdInChannel(bot, updatedAd);

    if (!result) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_EDIT_CHANNEL_MESSAGE);
    }

    return ctx.reply(MESSAGES.AD_HIDDEN, {
      reply_markup: { inline_keyboard: HIDE_AD_REASON_BUTTONS(adId) },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};

const hideAdReason = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const [, hideReason, adId] = (
      callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    if (!adId) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    const ad = await getAdvertisementById(adId);

    if (!ad) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    await ctx.deleteMessage();

    if (
      hideReason === HIDE_REASONS.SOLD_BY_BOT ||
      hideReason === HIDE_REASONS.SOLD_OTHER
    ) {
      await updateAdvertisement(adId, {
        hideReason: hideReason,
      });
    }

    return ctx.reply(MESSAGES.AD_HIDDEN_THANKS);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};

export const registerAdHideCallbacks = async (bot: Telegraf) => {
  bot.action(/^hide_ad:/, adHide);
  bot.action(/^confirm_hide_ad:/, (ctx) => confirmAdHide(ctx, bot));
  bot.action(/^hide_ad_reason:/, hideAdReason);
};
