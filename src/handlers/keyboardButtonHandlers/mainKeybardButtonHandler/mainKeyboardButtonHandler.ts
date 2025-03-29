import { Telegraf } from "telegraf";
import { MAIN_MENU_BUTTONS } from "constants/buttons";
import { handleCreateAd } from "./mainKeyboardButtonActions";

export const registerMainKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(MAIN_MENU_BUTTONS.CREATE_AD, handleCreateAd);
};
