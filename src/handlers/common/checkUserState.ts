import { USER_STATE_ENUM } from "../../constants/config";
import { getUser } from "../../services/User";

export const checkUserState = async (userId: string, step: USER_STATE_ENUM) => {
  const user = await getUser(userId);

  if (!user) {
    return false;
  }

  return user.state === step;
};

