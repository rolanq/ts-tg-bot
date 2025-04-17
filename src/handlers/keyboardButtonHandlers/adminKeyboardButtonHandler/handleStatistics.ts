import { ADMIN_STATISTIC_MESSAGE } from "constants/messages";
import { getBotStatistics } from "services/bot";
import { getUserById } from "services/User";
import { Context } from "telegraf";

export const handleStatistic = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const botStatistics = await getBotStatistics();
    const message = ADMIN_STATISTIC_MESSAGE(
      ctx.from?.id.toString(),
      botStatistics.adCount,
      botStatistics.activeAdsCount,
      botStatistics.soldCount,
      botStatistics.usersCount
    );

    return ctx.reply(message);
  } catch (error) {
    console.log(error);
  }
};
