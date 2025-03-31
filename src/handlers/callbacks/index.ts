import { Telegraf } from "telegraf";
import { registerAllPaginations } from "./paginations";
import { registerAdCallbacks } from "./ad";
import { registerSearchCallbacks } from "./search";
import { registerProfileCallbacks } from "./profile";
export const registerAllCallbacks = (bot: Telegraf) => {
  registerAllPaginations(bot);

  registerAdCallbacks(bot);
  registerSearchCallbacks(bot);
  registerProfileCallbacks(bot);
};
