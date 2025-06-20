import { Telegraf } from "telegraf";
import { registerAllPaginations } from "./paginations";
import { registerAdCallbacks } from "./ad";
import { registerSearchCallbacks } from "./search";
import { registerProfileCallbacks } from "./profile";
import { registerCommonCallbacks } from "./common";
import { registerUserCallbacks } from "./user";
import { registerAdminCallbacks } from "./admin/handleAllAdminCallbacks";
import { registerStepBack } from "./stepBack";

export const registerAllCallbacks = (bot: Telegraf) => {
  registerAllPaginations(bot);

  registerCommonCallbacks(bot);
  registerUserCallbacks(bot);

  registerAdCallbacks(bot);
  registerSearchCallbacks(bot);
  registerProfileCallbacks(bot);

  registerStepBack(bot);

  registerAdminCallbacks(bot);
};
