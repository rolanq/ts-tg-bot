import { ADMIN_PANEL_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { Telegraf } from "telegraf";
import { handleStatistic } from "./handleStatistics";
import { MESSAGES } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";
import { checkIsAdmin } from "handlers/common/checkIsUser";
import { handleUsers } from "./handleUsers";
import { handleBotSettings } from "./handleBotSettings";
import { handleAdvertismentsAdmin } from "./handleAdvertismentsAdmin";
import { handlePhoneNumbers } from "./handlePhoneNumbers";

export const registerAdminKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(Object.values(ADMIN_PANEL_BUTTONS_TEXT), async (ctx) => {
    const isAdmin = await checkIsAdmin(ctx);

    if (!isAdmin) {
      return;
    }

    switch (ctx.message.text) {
      case ADMIN_PANEL_BUTTONS_TEXT.STATISTIC:
        return handleStatistic(ctx);
      case ADMIN_PANEL_BUTTONS_TEXT.USERS:
        return handleUsers(ctx);
      case ADMIN_PANEL_BUTTONS_TEXT.BOT_SETTINGS:
        return handleBotSettings(ctx);
      case ADMIN_PANEL_BUTTONS_TEXT.ADVERTISEMENTS:
        return handleAdvertismentsAdmin(ctx);
      case ADMIN_PANEL_BUTTONS_TEXT.NUMBERS:
        return handlePhoneNumbers(ctx);

      case ADMIN_PANEL_BUTTONS_TEXT.MAIN_MENU:
        return ctx.reply(MESSAGES.WELCOME, {
          reply_markup: getMainKeyboard(),
        });
    }
  });
};
