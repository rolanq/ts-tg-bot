import { CallbackQuery } from "@telegraf/types";
import { AD_ACTIONS_BUTTONS, CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getAdvertisementsByUserId } from "services/advertisment";
import { Context } from "telegraf";
import { formatAdvertisementMedia } from "utils/utils";
import {
  InputMediaPhoto,
  InputMediaVideo,
} from "telegraf/typings/core/types/typegram";

export const handleMyAds = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;
    const [, selectedAdsStatus] = data.split(":");

    const advertisements = await getAdvertisementsByUserId(
      ctx.from.id.toString(),
      { isActive: selectedAdsStatus === "active" }
    );

    if (advertisements.length === 0) {
      return ctx.answerCbQuery(
        selectedAdsStatus === "active"
          ? MESSAGES.NO_ACTIVE_ADS
          : MESSAGES.NO_HIDDEN_ADS,
        { show_alert: true }
      );
    }

    await ctx.deleteMessage();

    for (const ad of advertisements) {
      if (!ad.id) {
        return;
      }

      const formattedAd = await formatAdvertisementMedia(ad);

      if (formattedAd.media) {
        const mediaGroup: (InputMediaPhoto | InputMediaVideo)[] = [
          ...(ad.video
            ? [
                {
                  type: "video" as const,
                  media: ad.video,
                },
              ]
            : []),
          ...(ad.photos?.map((photo) => ({
            type: "photo" as const,
            media: photo,
          })) || []),
        ];

        if (mediaGroup.length > 0) {
          mediaGroup[0] = {
            ...mediaGroup[0],
            caption: formattedAd.text || undefined,
            parse_mode: "HTML",
          };
        }

        const sentMediaGroup = await ctx.sendMediaGroup(mediaGroup);
        const keyboard = AD_ACTIONS_BUTTONS(ad, sentMediaGroup[0].message_id);

        await ctx.reply(MESSAGES.AD_ACTIONS, {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });
      } else if (formattedAd.text) {
        const keyboard = AD_ACTIONS_BUTTONS(ad);

        await ctx.reply(formattedAd.text, {
          reply_markup: {
            inline_keyboard: keyboard,
          },
          parse_mode: "HTML",
        });
      }
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
