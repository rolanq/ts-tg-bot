import { Telegraf } from "telegraf";
import { registerAllPaginations } from "./paginations";
import { registerAdCallbacks } from "./ad";
import { registerSearchCallbacks } from "./search";
import { registerProfileCallbacks } from "./profile";
import { registerCommonCallbacks } from "./common";

export const registerAllCallbacks = (bot: Telegraf) => {
  registerAllPaginations(bot);

  registerCommonCallbacks(bot);

  registerAdCallbacks(bot);
  registerSearchCallbacks(bot);
  registerProfileCallbacks(bot);
};
