import { Telegraf } from "telegraf";
import { registerBrandsPaginations } from "./brandsPagination";
import { registerRegionPagination } from "./regionsPagination";
import { registerYearsPagination } from "./yearsPagination";
import { registerMarksPaginations } from "./modelsPagination/modelsPagination";
export const registerAllPaginations = (bot: Telegraf) => {
  bot.action(/^page_brands:/, registerBrandsPaginations);
  bot.action(/^page_regions:/, registerRegionPagination);
  bot.action(/^page_years:/, registerYearsPagination);
  bot.action(/^page_models:/, registerMarksPaginations);
};
