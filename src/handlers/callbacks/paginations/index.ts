import { Telegraf } from "telegraf";
import { registerMarksPaginations } from "./brandsPagination";
import { registerRegionPagination } from "./regionsPagination";
import { registerAdCreationCallback } from "../adCreation/adCreation";
import { registerYearsPagination } from "./yearsPagination";
export const registerAllPaginations = (bot: Telegraf) => {
  bot.action(/^page_brands:\d+$/, registerMarksPaginations);
  bot.action(/^page_regions:\d+$/, registerRegionPagination);
  bot.action(/^page_years:\d+$/, registerYearsPagination);
};

export const registerAdCreationCallbacks = (bot: Telegraf) => {
  bot.action(/^select/, registerAdCreationCallback);
};
