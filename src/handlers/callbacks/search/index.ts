import { Telegraf } from "telegraf";
import {
  handleSearchResetAllFilters,
  handleSearchResetFilter,
} from "./handleReset";
import {
  handleSaveSearchFilter,
  handleSelectSearchFilter,
} from "./handleFilters";
import { handleSearch } from "./handleSearch";
import { handleSaveSearch } from "./handleSaveSearch";

export const registerSearchCallbacks = (bot: Telegraf) => {
  bot.action(/^search_ads/, handleSearch);

  bot.action(/^select_search_filter/, handleSelectSearchFilter);
  bot.action(/^save_search_filter/, handleSaveSearchFilter);

  bot.action(/^search_reset_parameters/, handleSearchResetAllFilters);
  bot.action(/^search_reset_filter/, handleSearchResetFilter);

  bot.action(/^save_search/, handleSaveSearch);
};
