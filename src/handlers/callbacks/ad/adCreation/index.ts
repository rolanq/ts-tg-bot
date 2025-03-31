import { Telegraf } from "telegraf";
import { adCreation } from "./adCreation";

export const registerAdCreationCallbacks = (bot: Telegraf) => {
  bot.action(/^select_adCreation/, adCreation);
};
