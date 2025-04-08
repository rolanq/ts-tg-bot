import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { USER_STATE_ENUM } from "constants/config";
import { getUser, updateUser } from "services/User";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { handleAdCreationMessage } from "./adCreation";
import { checkUserState } from "handlers/common/checkUserState";
import { handleSearchPrice } from "./search/handleSearchPrice";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";

export const registerMessageHandlers = (bot: Telegraf) => {
  bot.on(message("text"), async (ctx) => {
    try {
      if (!ctx.from?.id) {
        ctx.reply(ERROR_MESSAGES.ERROR);
        return;
      }

      const user = await getUser(ctx.from.id.toString());

      if (!user) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
      }

      if (
        user.updatedAt &&
        user.updatedAt < new Date(Date.now() - 1000 * 60 * 60)
      ) {
        ctx.reply(MESSAGES.WELCOME);
        await updateUser(ctx.from.id.toString(), {
          state: USER_STATE_ENUM.MENU,
        });
        return;
      }

      switch (user.state) {
        case USER_STATE_ENUM.MENU:
          ctx.reply(MESSAGES.WELCOME);
          break;
        case USER_STATE_ENUM.AD_CREATION:
          await handleAdCreationMessage(ctx);
          break;
        case USER_STATE_ENUM.SEARCH_PRICE_FROM:
          await handleSearchPrice(ctx);
          break;
        case USER_STATE_ENUM.SEARCH_PRICE_TO:
          await handleSearchPrice(ctx);
          break;
        default:
          return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP);
      }
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
