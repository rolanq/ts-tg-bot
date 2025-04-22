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

export async function getBrandsPerPage(
  page: number
): Promise<{ brands: IBrand[]; total: number; isLastPage: boolean }> {
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

export async function getModelsPerPage(
  page: number,
  brandId: number
): Promise<{ models: ICarModel[]; total: number; isLastPage: boolean }> {
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

export const getCarModelById = async (
  id: number
): Promise<ICarModel | null> => {
  const carModel = await CarModel.findByPk(id);
  return carModel ? carModel.get({ plain: true }) : null;
};

export const countBrands = async (): Promise<number> => {
  const brandsCount = await Brand.count();
  return brandsCount;
};

export const countModels = async (): Promise<number> => {
  const modelsCount = await CarModel.count();
  return modelsCount;
};

export const addBrand = async (name: string): Promise<IBrand> => {
  const brand = await Brand.create({ name });
  return brand.get({ plain: true });
};

export const deleteBrand = async (id: number): Promise<void> => {
  await Brand.destroy({ where: { id } });
};

export const getModelByName = async (
  name: string
): Promise<ICarModel | null> => {
  const model = await CarModel.findOne({ where: { name } });
  return model ? model.get({ plain: true }) : null;
};

export const deleteModel = async (id: number): Promise<void> => {
  await CarModel.destroy({ where: { id } });
};

export const addModel = async (
  name: string,
  brandId: number
): Promise<ICarModel> => {
  const model = await CarModel.create({ name, brandId });
  return model.get({ plain: true });
};
