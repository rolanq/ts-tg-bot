import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/steps";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { getFirstPageForDriveTypes } from "utils/pagination/getFirstPages";

export const engineTypeStep = async (
  ctx: Context,
  selectedEngineType: string
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      engineType: selectedEngineType,
      currentStep: STEPS_ENUM.DRIVETYPE,
    });

    const keyboard = getFirstPageForDriveTypes();

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.DRIVE_TYPE, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
