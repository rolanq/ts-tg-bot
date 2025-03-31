import { CallbackQuery } from "@telegraf/types";
import { HIDE_AD_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { getAdvertisementsByUserId } from "services/advertisment";
import { getUser } from "services/User";
import { Context } from "telegraf";

export const handleMyAds = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;
    const [, selectedAdsStatus] = data.split(":");

    const advertisements = await getAdvertisementsByUserId(
      ctx.from.id.toString(),
      { isActive: selectedAdsStatus === "active" }
    );

    if (advertisements.length === 0) {
      return ctx.reply(
        selectedAdsStatus === "active"
          ? MESSAGES.NO_ACTIVE_ADS
          : MESSAGES.NO_HIDDEN_ADS
      );
    }

    advertisements.forEach(async (ad) => {
      if (!ad.id) {
        return;
      }

      const message = await renderAdvertismentMessage(ad);

      if (ad.photos.length) {
        await ctx.sendMediaGroup(
          ad.photos.map((photo, i) => ({
            type: "photo",
            media: photo,
            caption: i === 0 ? message : undefined,
          }))
        );
        await ctx.reply(MESSAGES.AD_ACTIONS, {
          reply_markup: {
            inline_keyboard: HIDE_AD_BUTTONS(ad.id.toString()),
          },
        });
      } else {
        await ctx.reply(message, {
          reply_markup: {
            inline_keyboard: HIDE_AD_BUTTONS(ad.id.toString()),
          },
        });
      }
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
