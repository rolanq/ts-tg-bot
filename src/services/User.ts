import { IUser, User } from "utils/db";
import { USER_STATE_ENUM } from "constants/userState";

export const createUser = async (userId: string, username: string) => {
  const user = await User.create({
    id: Number(userId),
    username: username,
    state: USER_STATE_ENUM.MENU,
    availableListings: 0,
  });

  return user;
};

export const getUser = async (userId: string) => {
  const user = await User.findOne({
    where: {
      id: Number(userId),
    },
  });

  return user?.get({plain: true});
};

export const updateUser = async (userId: string, user: Partial<IUser>) => {
  const updatedUser = await User.update(user, {
    where: {
      id: userId,
    },
  });

  return updatedUser;
};

export const createUserIfNotExists = async (userId: string, username: string) => {
  const user = await getUser(userId);
  if (!user) {
    await createUser(userId, username);
  }

  return user;
};
