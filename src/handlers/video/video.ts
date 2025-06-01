import {
  CLOSE_BUTTONS,
  FINISH_PHOTOS_BUTTONS,
  STEP_BACK_BUTTON,
} from "constants/buttons/buttons";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { checkUserState } from "handlers/common/checkUserState";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export const registerVideoHandler = (bot: Telegraf) => {
  bot.on(message("video"), async (ctx) => {
    try {
      if (!ctx.from?.id) {
        ctx.reply(ERROR_MESSAGES.ERROR, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
        return;
      }
      const isUserInState = await checkUserState(
        ctx.from.id.toString(),
        USER_STATE_ENUM.AD_CREATION
      );
      if (!isUserInState) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft || !draft.currentStep) {
        return ctx.reply(ERROR_MESSAGES.ERROR, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      if (
        draft.currentStep !== STEPS_ENUM.VIDEO &&
        draft.currentStep !== STEPS_ENUM.VIDEO_EDIT
      ) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const videoFileId = ctx.message.video.file_id;

      await updateAdvertisementDraft(ctx.from.id.toString(), {
        video: videoFileId,
        currentStep: STEPS_ENUM.PHOTOS,
      });

      await ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
        reply_markup: {
          inline_keyboard: [
            ...FINISH_PHOTOS_BUTTONS(draft.photos?.length > 0),
            ...STEP_BACK_BUTTON,
          ],
        },
      });
    } catch (error) {
      console.log(error);

      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
