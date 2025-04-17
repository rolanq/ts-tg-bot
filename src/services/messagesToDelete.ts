import { MessageToDelete } from "utils/db";

export const getMessagesToDelete = async (userId: string) => {
  const messagesToDelete = await MessageToDelete.findOne({
    where: { userId },
  });

  return messagesToDelete?.get({ plain: true });
};

export const createMessageToDelete = async (userId: string) => {
  const messageToDelete = await MessageToDelete.create({
    userId,
    messagesToDelete: [],
  });

  return messageToDelete?.get({ plain: true });
};

export const addMessageToDelete = async (userId: string, messageId: number) => {
  const messageToDelete = await MessageToDelete.findOne({
    where: { userId },
  });

  if (messageToDelete) {
    const plainMessageToDelete = messageToDelete.get({ plain: true });

    await messageToDelete.update({
      messagesToDelete: [...plainMessageToDelete.messagesToDelete, messageId],
    });

    return messageToDelete.get({ plain: true });
  } else {
    const messageToDelete = await MessageToDelete.create({
      userId,
      messagesToDelete: [messageId],
    });

    return messageToDelete.get({ plain: true });
  }
};

export const deleteMessageToDelete = async (
  userId: string,
  messageId: number
) => {
  const messageToDelete = await MessageToDelete.findOne({
    where: { userId },
  });

  if (messageToDelete) {
    const plainMessageToDelete = messageToDelete.get({ plain: true });

    await messageToDelete.update({
      messagesToDelete: [
        ...plainMessageToDelete.messagesToDelete.filter(
          (message) => message !== messageId
        ),
      ],
    });

    return messageToDelete.get({ plain: true });
  }
};
