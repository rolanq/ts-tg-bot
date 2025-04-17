import { Message } from "@telegraf/types";
import { ADMIN_USER_BUTTONS, CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import { ADMIN_FOUND_USER_MESSAGE, ERROR_MESSAGES } from "constants/messages";
import { getStatisticsByUserId, getUser, updateUser } from "services/User";
import { Context } from "telegraf";
import { searchUser } from "utils/utils";

export const handleSearchingUser = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const user = await getUser(ctx.from?.id.toString());
    if (!user || !user.isAdmin) {
      return;
    }

    const text = (ctx.message as Message.TextMessage).text
      .replace("@", "")
      .replace("https://t.me/", "");

    const searchResult = await searchUser(text);
    if (!searchResult) {
      return ctx.reply(ERROR_MESSAGES.ERROR_USER_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const { user: foundUser, byAd } = searchResult;

    if (!foundUser) {
      return ctx.reply(ERROR_MESSAGES.ERROR_USER_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateUser(user.id, { state: USER_STATE_ENUM.MENU });

    const statistics = await getStatisticsByUserId(foundUser.id);
    const userMessage = ADMIN_FOUND_USER_MESSAGE(
      foundUser,
      statistics.adCount,
      statistics.activeAdsCount,
      statistics.soldCount,
      statistics.totalEarnings
    );

    return ctx.reply(
      `Пользователь найден по ${
        byAd ? "объявлению" : "id или username"
      }\n${userMessage}`,
      {
        reply_markup: {
          inline_keyboard: ADMIN_USER_BUTTONS(
            foundUser.id,
            foundUser.isBanned ? "unban" : "ban"
          ),
        },
      }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR_USER_NOT_FOUND, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
