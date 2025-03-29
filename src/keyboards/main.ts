import { Markup } from "telegraf";
import { MAIN_MENU_BUTTONS_TEXT } from "../constants/buttons/buttonsText.js";

export function getMainKeyboard() {
  return Markup.keyboard([
    [MAIN_MENU_BUTTONS_TEXT.CREATE_AD],
    [MAIN_MENU_BUTTONS_TEXT.PROFILE, MAIN_MENU_BUTTONS_TEXT.SEARCH],
  ]).resize().reply_markup;
}
