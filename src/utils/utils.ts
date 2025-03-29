import { Markup } from "telegraf";
import {
  InlineKeyboardButton,
  KeyboardButton,
} from "telegraf/typings/core/types/typegram";

export const getInlineKeyboard = (buttons: InlineKeyboardButton[]) => {
  return {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
};
