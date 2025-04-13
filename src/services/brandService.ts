import { Brand, CarModel, IBrand, ICarModel } from "utils/db";

export async function getAllBrands(): Promise<IBrand[]> {
  try {
    const brands = await Brand.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });

    return brands.map((brand) => brand.get({ plain: true }));
  } catch (error) {
    return [];
  }
}

export async function getBrandsPerPage(page: number): Promise<{brands: IBrand[], total: number, isLastPage: boolean}> {
  const brands = await Brand.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
    limit: 15,  
    offset: (page - 1) * 15,
  });

  const brandsCount = await Brand.count();

  return {
    brands: brands.map((brand) => brand.get({ plain: true })),
    total: brandsCount,
    isLastPage: brandsCount <= page * 15,
  };
}

export async function getBrandById(id: number): Promise<IBrand | null> {
  const brand = await Brand.findByPk(id);
  return brand ? brand.get({ plain: true }) : null;
}

export async function getModelsPerPage(page: number, brandId: number): Promise<{models: ICarModel[], total: number, isLastPage: boolean}> {
  const models = await CarModel.findAll({ 
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
    limit: 15,
    offset: (page - 1) * 15,
    where: {
      brandId,
    },
  });

  const modelsCount = await CarModel.count({
    where: {
      brandId,
    },
  });

  return {
    models: models.map((model) => model.get({ plain: true })),
    total: modelsCount,
    isLastPage: modelsCount <= page * 15,
  };
}

export const getCarModelById = async (id: number): Promise<ICarModel | null> => {
  const carModel = await CarModel.findByPk(id);
  return carModel ? carModel.get({ plain: true }) : null;
}

