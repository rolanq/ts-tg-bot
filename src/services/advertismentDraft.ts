import { STEPS_ENUM } from "constants/config";
import { IAdvertisementDraft, AdvertisementDraft } from "utils/db";

export const getAdvertisementDraft = async (
  userId: string
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: userId,
    },
  });

  if (draft) {
    return draft.get({ plain: true });
  }

  return null;
};

export const createAdvertisementDraft = async (
  userId: string,
  username: string | undefined
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.create({
    userId: userId,
    currentStep: STEPS_ENUM.REGION,
    telegramUsername: username,
    photos: [],
  });

  return draft.get({ plain: true });
};

export const updateAdvertisementDraft = async (
  userId: string,
  data: Partial<IAdvertisementDraft>
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.findOne({
    where: { userId: userId },
  });

  if (!draft) {
    return null;
  }

  await draft.update(data);

  return draft.get({ plain: true });
};

export const dropAdvertisementDraft = async (userId: string) => {
  await AdvertisementDraft.destroy({
    where: {
      userId: userId,
    },
  });
};

export const createIfNotExistsAndZeroOut = async (
  userId: string,
  username: string
) => {
  const draft = await getAdvertisementDraft(userId);

  if (!draft) {
    return await createAdvertisementDraft(userId, username);
  }

  await dropAdvertisementDraft(userId);
  const newDraft = await getAdvertisementDraft(userId);
  return newDraft;
};

export const addPhotoToDraft = async (userId: string, photo: string) => {
  const draft = await AdvertisementDraft.findOne({ where: { userId: userId } });
  if (!draft) {
    return null;
  }

  draft.set("photos", [...draft.getDataValue("photos"), photo]);
  await draft.save();

  return draft.get({ plain: true });
};
