import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { HIDE_REASONS } from "constants/config";
import { ADMIN_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import {
  getAdvertisementById,
  updateAdvertisement,
} from "services/advertisment";
import { Context } from "telegraf";

export const handleHideAd = async (ctx: Context) => {
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
    await updateAdvertisement(adId, {
      isActive: isUnhide,
      hideReason: isUnhide ? null : HIDE_REASONS.ADMIN_REASON,
    });

    await ctx.deleteMessage(Number(messageId));
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
