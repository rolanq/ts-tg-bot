import { Telegraf } from "telegraf";
import { acceptRules } from "./acceptRules";

export const registerUserCallbacks = (bot: Telegraf) => {
  bot.action("accept_rules", acceptRules);
};

