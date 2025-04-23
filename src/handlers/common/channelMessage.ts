import { Telegraf } from "telegraf";
import { IAdvertisement } from "../../utils/db";
import { formatAdvertisementMedia } from "utils/utils";
import { updateAdvertisement } from "services/advertisment";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

const channelId = process.env.TELEGRAM_CHANNEL_ID;

export const sendAdToChannel = async (bot: Telegraf, ad: IAdvertisement) => {
  try {
    if (!channelId || !ad.id) {
      return false;
    }

    const formattedAd = await formatAdvertisementMedia(ad);

    let messageId: number = 0;

    if (formattedAd.media) {
      const mediaGroup = await bot.telegram.sendMediaGroup(
        channelId,
        formattedAd.media
      );

      messageId = mediaGroup[0].message_id;
    } else if (formattedAd.text) {
      const message = await bot.telegram.sendMessage(
        channelId,
        formattedAd.text
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
        message
      );
    } else {
      await bot.telegram.editMessageText(
        channelId,
        Number(ad.channelMessageId),
        undefined,
        message
      );
    }

    return true;
  } catch (error) {
    return false;
  }
};
