import { ADMIN_PANEL_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { Telegraf } from "telegraf";
import { handleStatistic } from "./handleStatistics";
import { MESSAGES } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";

export const registerAdminKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(ADMIN_PANEL_BUTTONS_TEXT.STATISTIC, handleStatistic);
  bot.hears(ADMIN_PANEL_BUTTONS_TEXT.USERS, (ctx) => {
    return ctx.reply(MESSAGES.IN_WORK);
  });
  bot.hears(ADMIN_PANEL_BUTTONS_TEXT.MAIN_MENU, (ctx) => {
    return ctx.reply(MESSAGES.WELCOME, {
      reply_markup: getMainKeyboard(),
    });
  });
};
