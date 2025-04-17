import { Context } from "telegraf";
import { getUserById } from "services/User";

export const checkIsAdmin = async (ctx: Context) => {
  if (!ctx.from?.id) {
    return false;
  }

  const user = await getUserById(ctx.from?.id.toString());

  if (!user || !user.isAdmin) {
    return false;
  }

  return true;
};
