import { CLOSE_BUTTONS, PROFILE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, PROFILE_MESSAGE } from "constants/messages";
import { getStatisticsByUserId, getUser } from "services/User";
import { Context } from "telegraf";

export const handleProfile = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const statistics = await getStatisticsByUserId(ctx.from.id.toString());

    await ctx.deleteMessage();

    return ctx.reply(
      PROFILE_MESSAGE(
        user.id.toString(),
        user.availableListings,
        statistics.adCount,
        statistics.activeAdsCount,
        statistics.soldCount,
        statistics.totalEarnings
      ),
      { reply_markup: { inline_keyboard: [...PROFILE_BUTTONS] } }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
