import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";

export const transmissionTypeStep = async (
  ctx: Context,
  selectedTransmissionType: string
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      transmission: selectedTransmissionType,
      currentStep: STEPS_ENUM.HORSEPOWER,
    });

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
