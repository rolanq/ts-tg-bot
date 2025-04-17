import { Context } from "telegraf";
import { ERROR_MESSAGES, MESSAGES, RULES_MESSAGE } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";
import { getUserById } from "services/User";
import { ACCEPT_RULES_BUTTONS, CLOSE_BUTTONS } from "constants/buttons/buttons";
import { getBotSettings } from "services/botSettings";

export async function handleStart(ctx: Context) {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const user = await getUserById(ctx.from?.id.toString());
    const botSettings = await getBotSettings();

    if (!user) {
      return ctx.reply(RULES_MESSAGE.replace(
        "{supportUsername}",
        botSettings?.SupportUsername || ""
      ), {
        reply_markup: { inline_keyboard: ACCEPT_RULES_BUTTONS },
      });
    }

    return ctx.reply(MESSAGES.WELCOME, {
      reply_markup: getMainKeyboard(),
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
}
