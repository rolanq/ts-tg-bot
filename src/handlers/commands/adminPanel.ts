import { MESSAGES } from "constants/messages";
import { getAdminPanelKeyboard } from "keyboards/admin";
import { getUserById, updateUser } from "services/User";
import { Context } from "telegraf";

export const handleAdminPanel = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    if (ctx.from?.id.toString() === process.env.MAIN_ADMIN_ID) {
      await updateUser(ctx.from?.id.toString(), {
        isAdmin: true,
      });
    }

    const user = await getUserById(ctx.from?.id.toString());

    if (!user || !user.isAdmin) {
      return;
    }

    return ctx.reply(MESSAGES.ADMIN_PANEL, {
      reply_markup: getAdminPanelKeyboard(),
    });
  } catch (error) {
    console.log(error);
  }
};
