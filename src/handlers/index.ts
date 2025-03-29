import { Telegraf } from "telegraf";
import { registerAllKeyboardButtonHandlers } from "./keyboardButtonHandlers";
import { registerAllCommands } from "./commands";
export const registerAllHandlers = (bot: Telegraf) => {
  registerAllKeyboardButtonHandlers(bot);

  registerAllCommands(bot);
};
