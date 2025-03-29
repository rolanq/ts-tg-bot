import { Telegraf } from "telegraf";
import { MAIN_MENU_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { handleCreateAd } from "./mainKeyboardButtonActions";

export const registerMainKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(MAIN_MENU_BUTTONS_TEXT.CREATE_AD, handleCreateAd);
};
