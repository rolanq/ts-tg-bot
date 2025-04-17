import { Context } from "telegraf";
import {
  deleteMessageToDelete,
  getMessagesToDelete,
} from "services/messagesToDelete";
import { getUser, updateUser } from "services/User";
import { MESSAGES } from "constants/messages";
import { getBotSettings } from "services/botSettings";
import { USER_STATE_ENUM } from "constants/config";

export async function isUserBannedMiddleware(
  ctx: Context,
  next: () => Promise<void>
) {
  try {
    if (!ctx.from?.id) {
      return next();
    }

    const user = await getUser(ctx.from.id.toString());
    const botSettings = await getBotSettings();

    if (!user) {
      return next();
    }

    if (user.isBanned) {
      return ctx.reply(
        MESSAGES.BANNED.replace(
          "{supportUsername}",
          botSettings?.SupportUsername || ""
        )
      );
    } else {
      if (
        user.updatedAt &&
        user.updatedAt < new Date(Date.now() - 1000 * 60 * 60)
      ) {
        await updateUser(user.id, { state: USER_STATE_ENUM.MENU });
      }

      return next();
    }
  } catch (error) {
    return next();
  }
}
