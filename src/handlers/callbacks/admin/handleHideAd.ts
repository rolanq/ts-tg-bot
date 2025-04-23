import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { HIDE_REASONS } from "constants/config";
import { ADMIN_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { editAdInChannel } from "handlers/common/channelMessage";
import {
  getAdvertisementById,
  updateAdvertisement,
} from "services/advertisment";
import { Context, Telegraf } from "telegraf";

export const handleHideAd = async (ctx: Context, bot: Telegraf) => {
  try {
    const [hideAction, adId, messageId] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    const isUnhide = hideAction.includes("unhide");
    const ad = await getAdvertisementById(adId);

    if (!ad) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const updatedAd = await updateAdvertisement(adId, {
      isActive: isUnhide,
      hideReason: isUnhide ? null : HIDE_REASONS.ADMIN_REASON,
    });

    if (!updatedAd) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const result = await editAdInChannel(bot, updatedAd);
    if (!result) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_EDIT_CHANNEL_MESSAGE);
    }

    if (messageId) {
      await ctx.deleteMessage(Number(messageId));
    }

    await ctx.deleteMessage();

    return ctx.reply(
      isUnhide ? ADMIN_MESSAGES.AD_UNHIDDEN : ADMIN_MESSAGES.AD_HIDDEN,
      {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
