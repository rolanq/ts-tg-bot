import { Telegraf } from "telegraf";
import { registerAllKeyboardButtonHandlers } from "./keyboardButtonHandlers";
import { registerAllCommands } from "./commands";
import { registerAllCallbacks } from "./callbacks";
import { registerMessageHandlers } from "./messageHandlers";
import { registerPhotosHandler } from "./photos";
import { registerVideoHandler } from "./video/video";
export const registerAllHandlers = (bot: Telegraf) => {
  registerAllCommands(bot);

  registerAllKeyboardButtonHandlers(bot);
  registerAllCallbacks(bot);

  registerMessageHandlers(bot);
  registerPhotosHandler(bot);
  registerVideoHandler(bot);
};
