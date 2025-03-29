import { Brand, IBrand } from "utils/db";

export async function getAllBrands(): Promise<IBrand[]> {
  try {
    const brands = await Brand.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });

    return brands.map((brand) => brand.get({ plain: true }));
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return [];
  }
}
