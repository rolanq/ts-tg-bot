import { ADMIN_PANEL_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { Markup } from "telegraf";

export const getAdminPanelKeyboard = () => {
  return Markup.keyboard([
    [ADMIN_PANEL_BUTTONS_TEXT.STATISTIC, ADMIN_PANEL_BUTTONS_TEXT.USERS],
    [
      ADMIN_PANEL_BUTTONS_TEXT.ADVERTISEMENTS,
      ADMIN_PANEL_BUTTONS_TEXT.BOT_SETTINGS,
    ],
    [ADMIN_PANEL_BUTTONS_TEXT.NUMBERS],
    [ADMIN_PANEL_BUTTONS_TEXT.MAIN_MENU],
  ]).resize().reply_markup;
};
