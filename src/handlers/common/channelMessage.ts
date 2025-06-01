import { Telegraf } from "telegraf";
import { IAdvertisement } from "../../utils/db";
import { formatAdvertisementMedia } from "utils/utils";
import { updateAdvertisement } from "services/advertisment";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import {
  InputMediaPhoto,
  InputMediaVideo,
} from "telegraf/typings/core/types/typegram";

const channelId = process.env.TELEGRAM_CHANNEL_ID;

export const sendAdToChannel = async (bot: Telegraf, ad: IAdvertisement) => {
  try {
    if (!channelId || !ad.id) {
      return false;
    }

    const formattedAd = await formatAdvertisementMedia(ad);

    let messageId: number = 0;

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

      const sentMediaGroup = await bot.telegram.sendMediaGroup(
        channelId,
        mediaGroup
      );

      messageId = sentMediaGroup[0].message_id;
    } else if (formattedAd.text) {
      const message = await bot.telegram.sendMessage(
        channelId,
        formattedAd.text,
        { parse_mode: "HTML" }
      );
      messageId = message.message_id;
    }

    if (!messageId) {
      return false;
    }

    await updateAdvertisement(ad.id.toString(), {
      channelMessageId: messageId,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const editAdInChannel = async (bot: Telegraf, ad: IAdvertisement) => {
  try {
    if (!channelId || !ad.id || !ad.channelMessageId) {
      return false;
    }

    const message = await renderAdvertismentMessage(ad);

    if (ad.photos.length) {
      await bot.telegram.editMessageCaption(
        channelId,
        Number(ad.channelMessageId),
        undefined,
        message,
        { parse_mode: "HTML" }
      );
    } else {
      await bot.telegram.editMessageText(
        channelId,
        Number(ad.channelMessageId),
        undefined,
        message,
        { parse_mode: "HTML" }
      );
    }

    return true;
  } catch (error) {
    return false;
  }
};
