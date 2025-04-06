import { Op, WhereOptions } from "sequelize";
import { Brand, INotification, Notification, Region } from "utils/db";

export const createNotification = async (notification: INotification) => {
  const newNotification = await Notification.create(notification);
  return newNotification.get({ plain: true });
};

export const getNotifications = async (
  userId: string,
  whereCondition?: WhereOptions<INotification>
) => {
  const notifications = await Notification.findAll({
    where: {
      ...whereCondition,
      userId,
    },
  });

  return notifications.map((notification) => notification.get({ plain: true }));
};

export const deleteNotification = async (notificationId: string) => {
  await Notification.destroy({ where: { id: notificationId } });
};

export const deleteAllNotifications = async (userId: string) => {
  await Notification.destroy({ where: { userId } });
};
