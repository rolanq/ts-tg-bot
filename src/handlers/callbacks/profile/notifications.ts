import {
  CLOSE_BUTTONS,
  NOTIFICATION_BUTTONS,
  NOTIFICATIONS_LIST_BUTTONS,
} from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getBrandById } from "services/brandService";
import { getNotifications } from "services/notification";
import { getRegionById } from "services/regionService";
import { Context } from "telegraf";

export const handleNotifications = async (ctx: Context) => {
  try {
    const { from } = ctx;

    if (!from) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const notifications = await getNotifications(from.id.toString());

    if (notifications.length === 0) {
      return ctx.answerCbQuery(ERROR_MESSAGES.ERROR_NO_NOTIFICATIONS, {
        show_alert: true,
      });
    }

    const keyboard = await Promise.all(
      notifications.map(async (notification) => {
        let brandName = "Любая марка";
        let regionName = "Любой регион";

        if (notification.brandId) {
          const brand = await getBrandById(notification.brandId);
          brandName = brand?.name || "Любая марка";
        }

        if (notification.regionId) {
          const region = await getRegionById(notification.regionId);
          regionName = region?.name || "Любой регион";
        }

        return NOTIFICATION_BUTTONS(notification, brandName, regionName);
      })
    );

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.NOTIFICATION_LIST, {
      reply_markup: {
        inline_keyboard: [...keyboard, ...NOTIFICATIONS_LIST_BUTTONS],
      },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
