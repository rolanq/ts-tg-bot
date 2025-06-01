import { Telegraf } from "telegraf";
import { handleStepBack } from "./handleStepBack";

export const registerStepBack = (bot: Telegraf) => {
  bot.action("stepBack", handleStepBack);
};
