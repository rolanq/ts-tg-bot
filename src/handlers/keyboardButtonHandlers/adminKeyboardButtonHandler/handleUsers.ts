import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import { ADMIN_USERS_MESSAGE, ERROR_MESSAGES } from "constants/messages";
import { getAllUsers, updateUser } from "services/User";
import { Context } from "telegraf";

export const handleUsers = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const users = await getAllUsers();
    await updateUser(ctx.from?.id.toString(), {
      state: USER_STATE_ENUM.SEARCHING_USER,
    });

    return ctx.reply(
      ADMIN_USERS_MESSAGE.replace("{usersCount}", users.length.toString()),
      {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
