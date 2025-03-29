import { Telegraf } from "telegraf";
import { registerMainKeyboardButtonHandler } from "./mainKeybardButtonHandler";

export const registerAllKeyboardButtonHandlers = (bot: Telegraf) => {
  registerMainKeyboardButtonHandler(bot);
};
