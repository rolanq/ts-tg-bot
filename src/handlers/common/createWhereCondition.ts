import { Op, WhereOptions } from "sequelize";
import { IAdvertisement, INotification } from "utils/db";

export const getWhereConditionForNotifications = (
  ad: IAdvertisement
): WhereOptions<INotification> => {
  const priceCondition = {
    [Op.or]: [
      {
        [Op.and]: [
          { priceFrom: { [Op.lte]: ad.price } },
          { priceTo: { [Op.gte]: ad.price } },
        ],
      },
      {
        priceFrom: { [Op.lte]: ad.price },
        priceTo: null,
      },
      {
        priceFrom: null,
        priceTo: { [Op.gte]: ad.price },
      },
      {
        priceFrom: null,
        priceTo: null,
      },
    ],
  };

  const brandCondition = {
    [Op.or]: [{ brandId: ad.brandId }, { brandId: null }],
  };

  const regionCondition = {
    [Op.or]: [{ regionId: ad.regionId }, { regionId: null }],
  };

  const whereCondition = {
    [Op.and]: [priceCondition, brandCondition, regionCondition],
  };

  return whereCondition;
};
