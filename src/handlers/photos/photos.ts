import { CLOSE_BUTTONS, PHOTOS_BUTTONS } from "constants/buttons/buttons";
import { MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { checkUserState } from "handlers/common/checkUserState";
import {
  addPhotoToDraft,
  getAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { getBotSettings } from "services/botSettings";
import { getPhotoAndAddWatermark } from "./helpers";

export const registerPhotosHandler = (
  bot: Telegraf,
  isEdit: boolean = false
) => {
  bot.on(message("photo"), async (ctx) => {
    try {
      if (!ctx.from?.id) {
        ctx.reply(ERROR_MESSAGES.ERROR);
        return;
      }
      const botSettings = await getBotSettings();
      if (!botSettings) {
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
      if (
        !draft ||
        !draft.currentStep ||
        draft.currentStep !== STEPS_ENUM.PHOTOS
      ) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const { photos } = draft;

      if (photos && photos?.length >= 10) {
        await ctx.reply(MESSAGES.PHOTOS_LIMIT_REACHED);
        return;
      }

      const photo = ctx.message.photo[ctx.message.photo.length - 1];
      const fileInfo = await ctx.telegram.getFile(photo.file_id);
      const processedImageBuffer = await getPhotoAndAddWatermark(
        fileInfo,
        botSettings
      );
      const sentPhoto = await ctx.telegram.sendPhoto(ctx.chat.id, {
        source: processedImageBuffer,
      });
      await ctx.telegram.deleteMessage(ctx.chat.id, sentPhoto.message_id);

      const newDraft = await addPhotoToDraft(
        ctx.from.id.toString(),
        sentPhoto.photo[0].file_id
      );

      if (!newDraft) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const message = MESSAGES.PHOTOS_RECEIVED.replace(
        "{photoNumber}",
        newDraft.photos.length.toString()
      );
      await ctx.deleteMessage();
      await ctx.reply(message, {
        reply_markup: { inline_keyboard: PHOTOS_BUTTONS },
      });
    } catch (error) {
      console.log(error);

      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
