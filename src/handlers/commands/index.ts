import { COMMANDS_TEXT } from "constants/buttons/buttonsText";

import { Telegraf } from "telegraf";
import { handleStart } from "./commands";

export const registerAllCommands = (bot: Telegraf) => {
  bot.command(COMMANDS_TEXT.START, handleStart);
};
