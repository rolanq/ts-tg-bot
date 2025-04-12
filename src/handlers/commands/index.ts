import { COMMANDS_TEXT } from "constants/buttons/buttonsText";

import { Telegraf } from "telegraf";
import { handleStart } from "./commands";
import { handleAdminPanel } from "./adminPanel";

export const registerAllCommands = (bot: Telegraf) => {
  bot.command(COMMANDS_TEXT.START, handleStart);
  bot.command(COMMANDS_TEXT.ADMIN, handleAdminPanel);
};
