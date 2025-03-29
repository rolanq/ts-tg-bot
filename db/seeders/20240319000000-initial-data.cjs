"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавление регионов
    await queryInterface.bulkInsert(
      "Regions",
      [
        "Москва и Московская область",
        "Санкт-Петербург и Ленинградская область",
        "Алтайский край",
        "Амурская область",
        "Архангельская область",
        "Астраханская область",
        "Белгородская область",
        "Брянская область",
        "Владимирская область",
        "Волгоградская область",
        "Воронежская область",
        "Еврейская автономная область",
        "Забайкальский край",
        "Ивановская область",
        "Иркутская область",
        "Кабардино-Балкарская Республика",
        "Калининградская область",
        "Калужская область",
        "Камчатский край",
        "Карачаево-Черкесская Республика",
        "Кемеровская область (Кузбасс)",
        "Кировская область",
        "Костромская область",
        "Красноярский край",
        "Курганская область",
        "Курская область",
        "Липецкая область",
        "Магаданская область",
        "Мурманская область",
        "Ненецкий автономный округ",
        "Нижегородская область",
        "Новгородская область",
        "Новосибирская область",
        "Омская область",
        "Оренбургская область",
        "Орловская область",
        "Пензенская область",
        "Пермский край",
        "Приморский край",
        "Псковская область",
        "Республика Адыгея",
        "Республика Алтай",
        "Республика Башкортостан",
        "Республика Бурятия",
        "Республика Дагестан",
        "Республика Ингушетия",
        "Республика Калмыкия",
        "Республика Карелия",
        "Республика Коми",
        "Республика Крым",
        "Республика Марий Эл",
        "Республика Мордовия",
        "Республика Саха (Якутия)",
        "Республика Северная Осетия - Алания",
        "Республика Татарстан",
        "Республика Тыва",
        "Республика Хакасия",
        "Ростовская область",
        "Рязанская область",
        "Самарская область",
        "Саратовская область",
        "Сахалинская область",
        "Свердловская область",
        "Смоленская область",
        "Ставропольский край",
        "Тверская область",
        "Томская область",
        "Тульская область",
        "Тюменская область",
        "Удмуртская Республика",
        "Ульяновская область",
        "Хабаровский край",
        "Ханты-Мансийский автономный округ - Югра",
        "Челябинская область",
        "Чеченская Республика",
        "Чувашская Республика",
        "Чукотский автономный округ",
        "Ямало-Ненецкий автономный округ",
        "Ярославская область",
      ].map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Добавление брендов
    await queryInterface.bulkInsert(
      "Brands",
      [
        "Lada (BA3)",
        "Audi",
        "BELGEE",
        "BMW",
        "Changan",
        "CHERY",
        "Chevrolet",
        "Citroen",
        "Daewoo",
        "Exeed",
        "Ford",
        "GAC",
        "Geely",
        "Haval",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaecoo",
        "Jetour",
        "Kia",
        "Land Rover",
        "Lexus",
        "LiXiang",
        "Mazda",
        "Mercedes-Benz",
        "Mitsubishi",
        "Nissan",
        "Omoda",
        "Opel",
        "Peugeot",
        "Porsche",
        "Renault",
        "Skoda",
        "Ssang Yong",
        "Subaru",
        "Suzuki",
        "Tank",
        "Toyota",
        "Volkswagen",
        "Volvo",
        "УАЗ",
        "Genesis",
        "Jaguar",
        "Tesla",
        "Jeep",
        "Cadillac",
        "Ram",
        "SEAT",
        "Alfa Romeo",
        "Dacia",
        "Zeekr",
        "Hongqi",
        "FAW",
      ].map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Получаем ID брендов
    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Brands"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Создаем объект с соответствием названий брендов их ID
    const brandIds = {};
    brands.forEach((brand) => {
      brandIds[brand.name] = brand.id;
    });

    // Добавление моделей (базовые модели для некоторых популярных брендов)
    const carModels = [
      // Toyota
      {
        brandName: "Toyota",
        models: ["Camry", "Corolla", "RAV4", "Land Cruiser", "Highlander"],
      },
      // BMW
      {
        brandName: "BMW",
        models: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7"],
      },
      // Mercedes-Benz
      {
        brandName: "Mercedes-Benz",
        models: ["A-Class", "C-Class", "E-Class", "S-Class", "GLE", "GLS"],
      },
      // Audi
      { brandName: "Audi", models: ["A3", "A4", "A6", "Q3", "Q5", "Q7"] },
      // Volkswagen
      {
        brandName: "Volkswagen",
        models: ["Polo", "Passat", "Tiguan", "Touareg", "Golf", "Jetta"],
      },
      // Kia
      {
        brandName: "Kia",
        models: ["Rio", "Cerato", "K5", "Sportage", "Sorento", "Seltos"],
      },
      // Hyundai
      {
        brandName: "Hyundai",
        models: ["Solaris", "Elantra", "Sonata", "Creta", "Santa Fe", "Tucson"],
      },
      // Lada (BA3)
      {
        brandName: "Lada (BA3)",
        models: ["Vesta", "Granta", "XRAY", "Largus", "Niva"],
      },
    ];

    // Создаем массив для bulk insert моделей
    const carModelsToInsert = [];
    carModels.forEach((brand) => {
      if (brandIds[brand.brandName]) {
        brand.models.forEach((modelName) => {
          carModelsToInsert.push({
            brandId: brandIds[brand.brandName],
            name: modelName,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      }
    });

    await queryInterface.bulkInsert("CarModels", carModelsToInsert);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CarModels", null, {});
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.bulkDelete("Regions", null, {});
  },
};
