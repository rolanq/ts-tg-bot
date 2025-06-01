import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { getFirstPageForEngineTypes } from "utils/pagination/getFirstPages";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const yearStep = async (
  ctx: Context,
  selectedYear: string,
  isEdit: boolean = false
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      year: Number(selectedYear),
      currentStep: STEPS_ENUM.ENGINETYPE,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    const keyboard = getFirstPageForEngineTypes();
    return ctx.reply(CHOOSE_MESSAGES.ENGINE_TYPE, {
      reply_markup: { inline_keyboard: [...keyboard, ...STEP_BACK_BUTTON] },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
