import { Markup } from "telegraf";
import { MAIN_MENU_BUTTONS } from "../constants/buttons.js";

export function getMainKeyboard() {
  return Markup.keyboard([
    [MAIN_MENU_BUTTONS.CREATE_AD],
    [MAIN_MENU_BUTTONS.PROFILE, MAIN_MENU_BUTTONS.SEARCH],
  ]).resize().reply_markup;
}
