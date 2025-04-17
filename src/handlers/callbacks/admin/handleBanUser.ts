import { CallbackQuery } from "@telegraf/types";
import { ADMIN_USER_BUTTONS, CLOSE_BUTTONS } from "constants/buttons/buttons";
import {
  ADMIN_FOUND_USER_MESSAGE,
  ADMIN_MESSAGES,
  ERROR_MESSAGES,
  MESSAGES,
} from "constants/messages";
import { getStatisticsByUserId, getUserById, updateUser } from "services/User";
import { Context } from "telegraf";

export const handleBanUser = async (ctx: Context) => {
  try {
    const [, userId, action] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    const banAction = action === "ban" ? true : false;

    const user = await getUserById(userId);

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    if (user.isAdmin) {
      return ctx.reply(ERROR_MESSAGES.ERROR_ADMIN_BAN, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateUser(userId, { isBanned: banAction });

    const updatedUser = await getUserById(userId);

    if (!updatedUser) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const statistics = await getStatisticsByUserId(updatedUser.id);
    const userMessage = ADMIN_FOUND_USER_MESSAGE(
      updatedUser,
      statistics.adCount,
      statistics.activeAdsCount,
      statistics.soldCount,
      statistics.totalEarnings
    );

    return ctx.editMessageText(userMessage, {
      reply_markup: {
        inline_keyboard: ADMIN_USER_BUTTONS(
          updatedUser.id,
          updatedUser.isBanned ? "unban" : "ban"
        ),
      },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
