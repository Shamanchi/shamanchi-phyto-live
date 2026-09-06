// Общие константы магазина PHYTOTAB на платформе Shamanchi.
// До решения заказчика о запуске сайт не регистрируется на доменах бренда и не показывается
// как действующий магазин.

export const SITE_PATH = "/shamanchi-phyto-live";
export const SITE_URL = "https://shamanchi.github.io/shamanchi-phyto-live";

// Разработка (боевая строка подвала, как на сайте Shamanchi)
export const DEV_TG_HANDLE = "@shamanchi_dev";
export const DEV_TG_URL = "https://t.me/shamanchi_dev";
export const DEV_MAIL = "shamanchi_dev@mail.ru";
export const ORBIT_URL = "http://shamanchi.ru/";

// Публичные контакты магазина PHYTOTAB
export const SHOP_PHONE = "+7 (909) 984-05-06";
export const SHOP_PHONE_HREF = "tel:+79099840506";
export const SHOP_TG_URL = "https://telegram.me/phytotab";
// YouTube-канал врача: публичная ссылка; цифра подписчиков — на момент запуска перепроверить.
export const SHOP_YT_URL = "https://youtube.com/@vedamir.k";
export const SHOP_YT_CHANNEL = "Твоё здоровье";
export const SHOP_YT_SUBSCRIBERS = "416 000";
export const SHOP_EMAIL = "support@phytotab.ru";
export const MAX_SUPPORT_URL = "https://max.ru/id504712432604_bot";
export const SUPPORT_PHONE_RAW = "+7(909)984-05-06";
export const SUPPORT_HOURS = "с 10 до 20 (МСК)";
export const PICKUP_ADDRESS = "г. Москва, ул. Комдива Орлова, д. 8";
export const PICKUP_HOURS = "ежедневно с 11:00 до 19:00";

export const NAV_LINKS = [
  { href: "/catalog/", label: "Каталог" },
  { href: "/#shelves", label: "Подборки" },
  { href: "/#doctor", label: "О враче" },
  { href: "/knowledge/", label: "Знания врача" },
  { href: "/info/delivery/", label: "Доставка и оплата" },
  { href: "/reviews/", label: "Отзывы" },
];

// --- Бренд магазина ---
export const BRAND = {
  name: "PHYTOTAB",
  wordmarkA: "PHYTO",
  wordmarkB: "TAB",
  doctorName: "Евгений Козлов",
  doctorRole: "врач-фитотерапевт",
  claim: "Фитосборы врача Евгения Козлова",
};

// --- SEO: товарные запросы ниши ---
export const SEO = {
  titleDefault: "PHYTOTAB — фитосборы и товары для здоровья врача Евгения Козлова | купить с доставкой",
  description:
    "Фитосборы, грибы, витамины и наборы PHYTOTAB врача-фитотерапевта Евгения Козлова. Каталог с ценами, составом и способом применения, корзина, оформление заказа, доставка СДЭК по России.",
  keywords: [
    "фитосборы",
    "травяные сборы",
    "грибы в капсулах",
    "фитохитодезы",
    "наборы по системе Евгения Козлова",
    "коллаген",
    "магазин товаров здоровья",
    "PHYTOTAB",
  ],
};

// --- Маркетплейс: словари, промокоды, доставка, оплата ---
export const SHOP = {
  currency: "₽",
  unitLabel: "за упаковку",
  stockLabel: "В наличии",
  outLabel: "Нет в наличии",
  promoHint: "Коды для проверки механики скидок: PHYTOTAB10 (10%) и PHYTOTAB15 (15%)",
  promo: {
    PHYTOTAB10: { type: "percent", value: 10 },
    PHYTOTAB15: { type: "percent", value: 15 },
  },
  // Пороги бесплатной доставки СДЭК (условия магазина, по федеральным округам)
  freeDeliveryThresholds: {
    central: { label: "Центральный, Северо-Западный, Приволжский и Южный ФО", from: 7900 },
    ural: { label: "Сибирский и Уральский ФО, Калининградская область", from: 10900 },
    far: { label: "Дальневосточный ФО", from: 12900 },
  },
  delivery: [
    {
      key: "cdek",
      label: "СДЭК до пункта выдачи",
      cost: 350,
      note: "3–7 дней по России · бесплатно от 7 900 ₽",
      needAddress: false,
    },
    {
      key: "courier",
      label: "Курьер по Москве",
      cost: 550,
      note: "1–2 дня, по адресу",
      needAddress: true,
    },
    {
      key: "post",
      label: "Почта России",
      cost: 300,
      note: "7–14 дней по России",
      needAddress: true,
    },
    {
      key: "pickup",
      label: "Самовывоз в Москве",
      cost: 0,
      note: "ул. Комдива Орлова, 8 · ежедневно 11:00–19:00",
      needAddress: false,
    },
  ],
  payment: [
    { key: "card", label: "Банковской картой", note: "Карты РФ: ссылка на оплату после подтверждения заказа" },
    { key: "sbp", label: "СБП по QR-коду", note: "Система быстрых платежей: ссылка после подтверждения" },
  ],
};

export const FORMATS = [
  { key: "сбор", label: "Фитосборы" },
  { key: "капсулы", label: "Капсулы" },
  { key: "порошок", label: "Порошки" },
  { key: "таблетки", label: "Таблетки" },
  { key: "набор", label: "Наборы" },
  { key: "капли", label: "Капли" },
  { key: "спрей", label: "Спреи" },
];

export const PRICE_BANDS = [
  { key: "all", label: "Любая цена" },
  { key: "lt1500", label: "до 1 500 ₽", max: 1500 },
  { key: "1500_3000", label: "1 500–3 000 ₽", min: 1500, max: 3000 },
  { key: "3000_6000", label: "3 000–6 000 ₽", min: 3000, max: 6000 },
  { key: "gt6000", label: "от 6 000 ₽", min: 6000 },
];

export const SORTS = [
  { key: "default", label: "Сначала популярные" },
  { key: "price-asc", label: "Сначала дешевле" },
  { key: "price-desc", label: "Сначала дороже" },
  { key: "name", label: "По алфавиту" },
];

// Префикс для ссылок на файлы из public/
export function asset(path) {
  return SITE_PATH + path;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " \u20bd";
}