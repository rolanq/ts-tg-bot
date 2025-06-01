import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { getFirstPageForDriveTypes } from "utils/pagination/getFirstPages";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const engineTypeStep = async (
  ctx: Context,
  selectedEngineType: string,
  isEdit: boolean = false
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      engineType: selectedEngineType,
      currentStep: STEPS_ENUM.DRIVETYPE,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    const keyboard = getFirstPageForDriveTypes();
    return ctx.reply(CHOOSE_MESSAGES.DRIVE_TYPE, {
      reply_markup: { inline_keyboard: [...keyboard, ...STEP_BACK_BUTTON] },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
