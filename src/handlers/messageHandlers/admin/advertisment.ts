import { Message } from "@telegraf/types";
import { ADMIN_AD_ACTIONS_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getAdvertisementById } from "services/advertisment";
import { Context } from "telegraf";
import { formatAdvertisementMedia } from "utils/utils";

export const handleAdvertisementsAdmin = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;

    const parsedText = parseInt(text);

    if (isNaN(parsedText)) {
      return ctx.reply(ERROR_MESSAGES.ERROR_CANT_PARSE_NUMBER);
    }

    const advertisement = await getAdvertisementById(parsedText.toString());

    if (!advertisement) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AD_NOT_FOUND);
    }

    const { text: message, media } = await formatAdvertisementMedia(
      advertisement
    );

    if (media) {
      const mediaGroup = await ctx.sendMediaGroup(media);
      const keyboard = ADMIN_AD_ACTIONS_BUTTONS(
        advertisement,
        mediaGroup[0].message_id
      );

      await ctx.reply(MESSAGES.AD_ACTIONS, {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      });
    } else if (message) {
      const keyboard = ADMIN_AD_ACTIONS_BUTTONS(advertisement);

      await ctx.reply(message, {
        reply_markup: {
          inline_keyboard: keyboard,
        },
        parse_mode: "HTML",
      });
    }
  } catch (error) {
    console.log(error);

    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
