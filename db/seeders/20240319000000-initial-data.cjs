"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавление регионов
    await queryInterface.bulkInsert(
      "Regions",
      [
        "Москва",
        "Санкт-Петербург",
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
      // Lada (BA3)
      {
        brandName: "Lada (BA3)",
        models: [
          "1111 Ока",
          "2101",
          "2102",
          "2103",
          "2104",
          "2105",
          "2106",
          "2107",
          "2108",
          "2109",
          "21099",
          "2110",
          "2111",
          "2112",
          "2113",
          "2114",
          "2115",
          "2121 (4x4)",
          "Granta",
          "Kalina",
          "Largus",
          "Niva",
          "Niva Legend",
          "Priora",
          "Vesta",
          "XRAY",
        ],
      },
      // Audi
      {
        brandName: "Audi",
        models: [
          "100",
          "80",
          "A1",
          "A2",
          "A3",
          "A4",
          "A5",
          "A6",
          "A7",
          "A8",
          "e-tron",
          "Q2",
          "Q3",
          "Q4",
          "Q5",
          "Q6",
          "Q7",
          "Q8",
          "TT",
        ],
      },
      // BELGEE
      {
        brandName: "BELGEE",
        models: ["X50", "X70"],
      },
      // BMW
      {
        brandName: "BMW",
        models: [
          "1 серии",
          "2 серии",
          "3 серии",
          "4 серии",
          "5 серии",
          "6 серии",
          "7 серии",
          "8 серии",
          "X1",
          "X2",
          "X3",
          "X4",
          "X5",
          "X6",
          "X7",
          "XM",
          "Z3",
          "Z4",
        ],
      },
      // Changan
      {
        brandName: "Changan",
        models: [
          "Alsvin",
          "CS35",
          "CS55",
          "CS75",
          "CS85",
          "CS95",
          "Eado",
          "Hunter",
          "UNI-K",
          "UNI-T",
          "UNI-V",
        ],
      },
      // CHERY
      {
        brandName: "CHERY",
        models: [
          "Amulet (A15)",
          "Arrizo 5",
          "Arrizo 8",
          "Tiggo 3",
          "Tiggo 4",
          "Tiggo 4 Pro",
          "Tiggo 5",
          "Tiggo 7",
          "Tiggo 7 Pro",
          "Tiggo 8",
          "Tiggo 8 Pro",
          "Tiggo 8 Pro Max",
          "Tiggo 9",
        ],
      },
      // Chevrolet
      {
        brandName: "Chevrolet",
        models: [
          "Aveo",
          "Camaro",
          "Captiva",
          "Cobalt",
          "Cruze",
          "Epica",
          "Lacetti",
          "Lanos",
          "Niva",
          "Orlando",
          "Spark",
          "Tahoe",
          "TrailBlazer",
        ],
      },
      // Hyundai
      {
        brandName: "Hyundai",
        models: [
          "Accent",
          "Creta",
          "Elantra",
          "Getz",
          "i30",
          "i40",
          "ix35",
          "Kona",
          "Palisade",
          "Santa Fe",
          "Solaris",
          "Sonata",
          "Tucson",
          "Venue",
        ],
      },
      // Kia
      {
        brandName: "Kia",
        models: [
          "Ceed",
          "Cerato",
          "K5",
          "Mohave",
          "Optima",
          "Picanto",
          "Rio",
          "Seltos",
          "Sorento",
          "Soul",
          "Sportage",
          "Stinger",
        ],
      },
      // Lexus
      {
        brandName: "Lexus",
        models: [
          "CT",
          "ES",
          "GS",
          "GX",
          "IS",
          "LC",
          "LS",
          "LX",
          "NX",
          "RX",
          "RZ",
        ],
      },
      // Mazda
      {
        brandName: "Mazda",
        models: [
          "2",
          "3",
          "6",
          "CX-3",
          "CX-30",
          "CX-4",
          "CX-5",
          "CX-50",
          "CX-60",
          "CX-9",
        ],
      },
      // Mercedes-Benz
      {
        brandName: "Mercedes-Benz",
        models: [
          "A-Класс",
          "B-Класс",
          "C-Класс",
          "E-Класс",
          "G-Класс",
          "GLA",
          "GLB",
          "GLC",
          "GLE",
          "GLS",
          "S-Класс",
          "V-Класс",
        ],
      },
      // Nissan
      {
        brandName: "Nissan",
        models: [
          "Almera",
          "Juke",
          "Leaf",
          "Murano",
          "Navara",
          "Note",
          "Pathfinder",
          "Qashqai",
          "Teana",
          "Terrano",
          "X-Trail",
        ],
      },
      // Toyota
      {
        brandName: "Toyota",
        models: [
          "Camry",
          "Corolla",
          "RAV4",
          "Land Cruiser",
          "Highlander",
          "Prado",
          "Fortuner",
          "Hilux",
          "Prius",
          "C-HR",
        ],
      },
      // Volkswagen
      {
        brandName: "Volkswagen",
        models: [
          "Polo",
          "Golf",
          "Passat",
          "Tiguan",
          "Touareg",
          "Jetta",
          "Taos",
          "Arteon",
          "Caddy",
          "Transporter",
        ],
      },
      // Geely
      {
        brandName: "Geely",
        models: [
          "Atlas",
          "Atlas Pro",
          "Coolray",
          "Emgrand",
          "Monjaro",
          "Tugella",
        ],
      },
      // Haval
      {
        brandName: "Haval",
        models: ["F7", "F7x", "H6", "H9", "Jolion", "Dargo"],
      },
      // Citroen
      {
        brandName: "Citroen",
        models: [
          "Berlingo",
          "C-Elysee",
          "C3",
          "C4",
          "C5 Aircross",
          "SpaceTourer",
        ],
      },
      // Exeed
      {
        brandName: "Exeed",
        models: ["LX", "RX", "TXL", "VX"],
      },
      // GAC
      {
        brandName: "GAC",
        models: ["Empow", "GS3", "GS8", "GN8", "M8"],
      },
      // Infiniti
      {
        brandName: "Infiniti",
        models: ["Q50", "QX50", "QX55", "QX60", "QX80"],
      },
      // Jaecoo
      {
        brandName: "Jaecoo",
        models: ["J7", "J8"],
      },
      // Jetour
      {
        brandName: "Jetour",
        models: ["Dashing", "X50", "X70", "X90", "X90 PLUS"],
      },
      // Land Rover
      {
        brandName: "Land Rover",
        models: [
          "Defender",
          "Discovery",
          "Discovery Sport",
          "Range Rover",
          "Range Rover Sport",
          "Range Rover Velar",
        ],
      },
      // LiXiang
      {
        brandName: "LiXiang",
        models: ["L7", "L8", "L9", "One"],
      },
      // Mitsubishi
      {
        brandName: "Mitsubishi",
        models: ["ASX", "Eclipse Cross", "L200", "Outlander", "Pajero Sport"],
      },
      // Opel
      {
        brandName: "Opel",
        models: ["Astra", "Combo", "Crossland", "Grandland", "Zafira"],
      },
      // Peugeot
      {
        brandName: "Peugeot",
        models: ["2008", "3008", "408", "5008", "Partner"],
      },
      // Porsche
      {
        brandName: "Porsche",
        models: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
      },
      // Renault
      {
        brandName: "Renault",
        models: ["Arkana", "Duster", "Kaptur", "Logan", "Sandero"],
      },
      // Skoda
      {
        brandName: "Skoda",
        models: ["Octavia", "Karoq", "Kodiaq", "Rapid", "Superb"],
      },
      // Subaru
      {
        brandName: "Subaru",
        models: ["Forester", "Legacy", "Outback", "XV", "WRX"],
      },
      // Suzuki
      {
        brandName: "Suzuki",
        models: ["Grand Vitara", "Jimny", "SX4", "Vitara", "Swift"],
      },
      // Tank
      {
        brandName: "Tank",
        models: ["300", "500", "700"],
      },
      // УАЗ
      {
        brandName: "УАЗ",
        models: ["Hunter", "Patriot", "Pickup", "Profi", "Буханка"],
      },
      // Genesis
      {
        brandName: "Genesis",
        models: ["G70", "G80", "G90", "GV70", "GV80"],
      },
      // Jaguar
      {
        brandName: "Jaguar",
        models: ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XF"],
      },
      // Tesla
      {
        brandName: "Tesla",
        models: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
      },
      // Jeep
      {
        brandName: "Jeep",
        models: [
          "Cherokee",
          "Compass",
          "Grand Cherokee",
          "Renegade",
          "Wrangler",
        ],
      },
      // Cadillac
      {
        brandName: "Cadillac",
        models: ["CT4", "CT5", "Escalade", "XT4", "XT5"],
      },
      // Volvo
      {
        brandName: "Volvo",
        models: ["S60", "S90", "XC40", "XC60", "XC90"],
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
