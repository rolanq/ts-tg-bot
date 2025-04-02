import { Message } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { STEPS_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";

export const handleDescriptionStep = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.PRICE,
      description: text,
    });

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.PRICE);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
