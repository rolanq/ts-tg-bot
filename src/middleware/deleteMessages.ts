import { Context } from "telegraf";
import {
  deleteMessageToDelete,
  getMessagesToDelete,
} from "services/messagesToDelete";
import { getUser } from "services/User";

export async function deleteMessagesMiddleware(
  ctx: Context,
  next: () => Promise<void>
) {
  try {
    if (!ctx.from?.id) {
      return next();
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return next();
    }

    const messagesToDelete = await getMessagesToDelete(user.id);

    if (messagesToDelete && messagesToDelete.messagesToDelete.length > 0) {
      for (const messageId of messagesToDelete.messagesToDelete) {
        try {
          await ctx.telegram.deleteMessage(user.id, messageId);
          await deleteMessageToDelete(user.id, messageId);
        } catch (error) {
          console.error(`Не удалось удалить сообщение ${messageId}:`, error);
          next();
        }
      }
    }
  } catch (error) {
    console.error("Ошибка в middleware удаления сообщений:", error);
  }

  return next();
}
