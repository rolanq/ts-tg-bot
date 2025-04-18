import { Telegraf } from "telegraf";
import { MAIN_MENU_BUTTONS_TEXT } from "constants/buttons/buttonsText";
import { handleCreateAd } from "./handleCreateAd";
import { handleSearch } from "./handleSearch";
import { handleProfile } from "./handleProfile";
import { handleRules } from "./handleRules";
import { handleSupport } from "./handleSupport";
import { handleChannel } from "./handleChannel";

export const registerMainKeyboardButtonHandler = (bot: Telegraf) => {
  bot.hears(MAIN_MENU_BUTTONS_TEXT.CREATE_AD, handleCreateAd);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.SEARCH, handleSearch);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.PROFILE, handleProfile);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.RULES, handleRules);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.SUPPORT, handleSupport);
  bot.hears(MAIN_MENU_BUTTONS_TEXT.CHANNEL, handleChannel);
};
