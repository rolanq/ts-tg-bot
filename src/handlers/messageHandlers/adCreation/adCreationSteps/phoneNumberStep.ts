import { Message } from "@telegraf/types";
import { FINISH_PHOTOS_BUTTONS } from "constants/buttons/buttons";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/steps";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";

export const handlePhoneNumberStep = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.PHOTOS,
      phoneNumber: text,
    });

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
      reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
