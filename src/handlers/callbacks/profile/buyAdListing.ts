import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getUser, updateUser } from "services/User";
import { Context } from "telegraf";

export const handleBuyAdListing = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }

    await updateUser(ctx.from.id.toString(), {
      availableListings: user.availableListings + 1,
    });

    await ctx.deleteMessage();

    return ctx.answerCbQuery(MESSAGES.AD_LISTING_PURCHASED, {
      show_alert: true,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
