import { IRegion, Region } from "utils/db";

export const getRegionsPerPage = async (page: number) => {
  const regions = await Region.findAll({
    limit: 8,
    offset: (page - 1) * 8,
  });

  const regionsCount = await Region.count();

  return {
    regions: regions.map((region) => region.get({ plain: true })),
    total: regionsCount,
    isLastPage: regionsCount <= page * 8,
  };
};

export const getRegionById = async (id: number): Promise<IRegion | null> => {
  const region = await Region.findByPk(id);
  return region ? region.get({ plain: true }) : null;
}



