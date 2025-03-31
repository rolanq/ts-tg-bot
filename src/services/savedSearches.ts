import { ISavedSearch, SavedSearch } from "utils/db";

export const createIfNotExistsSavedSearch = async (userId: string) => {
  const savedSearch = await SavedSearch.findOne({
    where: { userId },
  });

  if (savedSearch) {
    return savedSearch.get({ plain: true });
  }

  const newSearch = await SavedSearch.create({
    userId,
    brandId: null,
    regionId: null,
    priceFrom: null,
    priceTo: null,
  });

  return newSearch.get({ plain: true });
};

export const updateSavedSearch = async (
  userId: string,
  data: Partial<ISavedSearch>
) => {
  const savedSearch = await SavedSearch.findOne({
    where: { userId },
  });

  if (!savedSearch) {
    throw new Error("Saved search not found");
  }

  await savedSearch.update(data);

  return savedSearch.get({ plain: true });
};

export const dropSavedSearch = async (userId: string) => {
  const savedSearch = await SavedSearch.update(
    {
      brandId: null,
      regionId: null,
      priceFrom: null,
      priceTo: null,
    },
    {
      where: { userId },
    }
  );

  if (savedSearch[0] === 0) {
    return false;
  }

  return true;
};

export const getSavedSearch = async (userId: string) => {
  const savedSearch = await SavedSearch.findOne({
    where: { userId },
  });

  return savedSearch?.get({ plain: true });
};
