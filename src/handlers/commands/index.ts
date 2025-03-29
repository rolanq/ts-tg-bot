import { COMMANDS } from "constants/buttons";

import { Telegraf } from "telegraf";
import { handleStart } from "./commands";

export const registerAllCommands = (bot: Telegraf) => {
  bot.command(COMMANDS.START, handleStart);
};

