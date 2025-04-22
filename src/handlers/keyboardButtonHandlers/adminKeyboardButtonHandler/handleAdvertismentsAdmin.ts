import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import { MESSAGES } from "constants/messages";
import { countAdvertisements } from "services/advertisment";
import { updateUser } from "services/User";
import { Context } from "telegraf";

export const handleAdvertismentsAdmin = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    await updateUser(ctx.from.id.toString(), {
      state: USER_STATE_ENUM.ADVERTISEMENTS_ADMIN,
    });

    const advertisements = await countAdvertisements();

    const message = MESSAGES.ADVERTISEMENTS_ADMIN.replace(
      "{advertisementsCount}",
      advertisements.toString()
    );

    return ctx.reply(message, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  } catch (error) {
    console.log(error);
  }
};
