import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { getFirstPageForTransmissionTypes } from "utils/pagination/getFirstPages";

export const driveTypeStep = async (
  ctx: Context,
  selectedDriveType: string
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      driveType: selectedDriveType,
      currentStep: STEPS_ENUM.TRANSMISSIONTYPE,
    });

    const keyboard = getFirstPageForTransmissionTypes();

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.TRANSMISSION, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
