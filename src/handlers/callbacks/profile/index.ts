import { Telegraf } from "telegraf";
import { handleMyAds } from "./myAds";
import { handleBuyAdListing } from "./buyAdListing";

export const registerProfileCallbacks = (bot: Telegraf) => {
  bot.action(/^my_ads/, handleMyAds);
  bot.action(/^buy_ad_listing/, handleBuyAdListing);
};

