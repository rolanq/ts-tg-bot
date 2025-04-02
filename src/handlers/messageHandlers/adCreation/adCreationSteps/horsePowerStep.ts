import { Message } from '@telegraf/types';
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from 'constants/messages';
import { HORSE_POWER, STEPS_ENUM } from 'constants/config';
import { updateAdvertisementDraft } from 'services/advertismentDraft';
import { Context } from 'telegraf';
import { parseNumberWithAbbreviations } from 'utils/utils';

export const handleHorsePowerStep = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const text = (ctx.message as Message.TextMessage).text;
    let power = parseNumberWithAbbreviations(text);

    if (!isNaN(power) && power > HORSE_POWER.MIN && power < HORSE_POWER.MAX) {
      await updateAdvertisementDraft(ctx.from.id.toString(), {
        currentStep: STEPS_ENUM.MILEAGE,
        horsePower: power,
      });

      await ctx.deleteMessage();

      return ctx.reply(CHOOSE_MESSAGES.MILEAGE);
    }
    return ctx.reply(ERROR_MESSAGES.ERROR_WITH_HORSEPOWER);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
