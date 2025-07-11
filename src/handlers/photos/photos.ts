import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { checkUserState } from "handlers/common/checkUserState";
import {
  addPhotoToDraft,
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

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

      if (!draft || !draft.currentStep) {
        return ctx.reply(ERROR_MESSAGES.ERROR, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      if (
        draft.currentStep !== STEPS_ENUM.PHOTOS &&
        draft.currentStep !== STEPS_ENUM.PHOTOS_EDIT
      ) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP);
      }

      const { photos } = draft;

      if (photos && photos?.length >= 9) {
        await ctx.reply(MESSAGES.PHOTOS_LIMIT_REACHED);
        return;
      }
      const photo = ctx.message.photo[ctx.message.photo.length - 1];

      const newDraft = await addPhotoToDraft(
        ctx.from.id.toString(),
        photo.file_id
      );

      if (!newDraft) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      await updateAdvertisementDraft(ctx.from.id.toString(), {
        currentStep: STEPS_ENUM.PHOTOS,
      });

      await ctx.deleteMessage();
    } catch (error) {
      console.log(error);

      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
