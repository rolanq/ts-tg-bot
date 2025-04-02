import { Message } from '@telegraf/types';
import { STEPS_ENUM } from 'constants/config';
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from 'constants/messages';
import { updateAdvertisementDraft } from 'services/advertismentDraft';
import { Context } from 'telegraf';

export const handleDescriptionStep = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;

    if (text.length <= 255) {
      await updateAdvertisementDraft(ctx.from.id.toString(), {
        currentStep: STEPS_ENUM.PRICE,
        description: text,
      });

      await ctx.deleteMessage();
      return ctx.reply(CHOOSE_MESSAGES.PRICE);
    }
    return ctx.reply(ERROR_MESSAGES.ERROR_WITH_DISCRIPTION);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
