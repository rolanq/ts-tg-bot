import { Telegraf } from "telegraf";
import { handleMyAds } from "./myAds";
import { handleBuyAdListing } from "./buyAdListing";
import { handleNotifications } from "./notifications";
import { handleNotificationDelete } from "./deleteNotification";
import { handleDeleteAllNotifications } from "./deleteAllNotifications";

export const registerProfileCallbacks = (bot: Telegraf) => {
  bot.action(/^my_ads/, handleMyAds);
  // bot.action(/^buy_ad_listing/, handleBuyAdListing);
  bot.action(/^notifications/, handleNotifications);
  bot.action(/^notification_delete/, handleNotificationDelete);
  bot.action(/^delete_all_notifications/, handleDeleteAllNotifications);
};
