import { PHOTOS_BUTTONS } from "constants/buttons/buttons";
import { MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { checkUserState } from "handlers/common/checkUserState";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { addWatermark } from "utils/addWatermark";

export const registerPhotosHandler = (bot: Telegraf) => {
  bot.on(message("photo"), async (ctx) => {
    try {
      if (!ctx.from?.id) {
        ctx.reply(ERROR_MESSAGES.ERROR);
        return;
      }

      const isUserInState = await checkUserState(
        ctx.from.id.toString(),
        USER_STATE_ENUM.AD_CREATION
      );

      if (!isUserInState) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP);
      }

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (draft && draft.currentStep === STEPS_ENUM.PHOTOS) {
        const photos = [...(draft.photos || [])];

        if (draft.photos && draft.photos?.length >= 10) {
          await ctx.reply(MESSAGES.PHOTOS_LIMIT_REACHED);
          return;
        }

        const photo = ctx.message.photo[ctx.message.photo.length - 1];
        const fileInfo = await ctx.telegram.getFile(photo.file_id);
        const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;
        const response = await fetch(fileUrl);
        const imageBuffer = await response.arrayBuffer();
        const processedImageBuffer = await addWatermark(
          Buffer.from(imageBuffer)
        );

        const sentPhoto = await ctx.telegram.sendPhoto(ctx.chat.id, {
          source: processedImageBuffer,
        });
        await ctx.telegram.deleteMessage(ctx.chat.id, sentPhoto.message_id);

        photos.push(sentPhoto.photo[sentPhoto.photo.length - 1].file_id);

        await updateAdvertisementDraft(ctx.from.id.toString(), {
          photos,
        });

        const message = MESSAGES.PHOTOS_RECEIVED.replace(
          "{photoNumber}",
          photos.length.toString()
        );

        await ctx.deleteMessage();

        await ctx.reply(message, {
          reply_markup: { inline_keyboard: PHOTOS_BUTTONS },
        });
      }
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });
};
