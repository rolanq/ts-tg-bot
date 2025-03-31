import { Telegraf } from "telegraf";
import { MAIN_MENU_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { handleCreateAd } from "./handleCreateAd";
import { handleSearch } from "./handleSearch";
import { handleProfile } from "./handleProfile";

export const registerMainKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(MAIN_MENU_BUTTONS_TEXT.CREATE_AD, handleCreateAd);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.SEARCH, handleSearch);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.PROFILE, handleProfile);
};
