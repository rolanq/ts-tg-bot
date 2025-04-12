import { Telegraf } from "telegraf";
import { registerMainKeyboardButtonHandler } from "./mainKeybardButtonHandler";
import { registerAdminKeyboardButtonHandler } from "./adminKeyboardButtonHandler/adminKeyboardButtonHandler";

export const registerAllKeyboardButtonHandlers = (bot: Telegraf) => {
  registerMainKeyboardButtonHandler(bot);
  registerAdminKeyboardButtonHandler(bot);
};
