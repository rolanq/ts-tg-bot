import { Message } from "@telegraf/types";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { parseNumberWithAbbreviations } from "utils/utils";

export const handlePriceStep = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.PHONENUMBER,
      price: parseNumberWithAbbreviations(text),
    });

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
