import { Message } from "@telegraf/types";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { RESTRICTIONS, STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { parseNumberWithAbbreviations } from "utils/utils";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handlePriceStep = async (
  ctx: Context,
  isEdit: boolean = false
) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const price = parseNumberWithAbbreviations(text);

    if (price > RESTRICTIONS.PRICE.MAX || price < RESTRICTIONS.PRICE.MIN) {
      return ctx.reply(ERROR_MESSAGES.ERROR_PRICE, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.PHONENUMBER,
      price: price,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
