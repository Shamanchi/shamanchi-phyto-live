// Генерация data/products.json, data/catalog.json и копия фото для Сборки Б.
// Источник: reports/Phytotab/Воркер-2/Сбор Б — каталог (products.json, catalog-structure.json, products-img/).
// Запуск: node scripts/build-live-data.mjs <путь-к-источникам> (по умолчанию ../reports/... относительно корня репо)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const srcRoot = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(root, "..", "reports", "Phytotab", "Воркер-2", "Сбор Б — каталог");

const rawProducts = JSON.parse(readFileSync(join(srcRoot, "products.json"), "utf8"));
const structure = JSON.parse(readFileSync(join(srcRoot, "catalog-structure.json"), "utf8"));

const FORMAT_KEYS = {
  "травяной сбор": "сбор",
  "порошок": "порошок",
  "порошок (банка)": "порошок",
  "таблетки": "таблетки",
  "набор": "набор",
  "капли": "капли",
  "спрей": "спрей",
  "не указано": "капсулы",
};
const FORMAT_LABELS = {
  "сбор": "Фитосбор",
  "порошок": "Порошок",
  "капсулы": "Капсулы",
  "таблетки": "Таблетки",
  "набор": "Набор",
  "капли": "Капли",
  "спрей": "Спрей",
};

const hits = new Set(structure.collections?.hits || []);
const news = new Set(structure.collections?.new || []);
const sales = new Set([
  ...(structure.collections?.sale || []),
  ...(structure.collections?.sectionDiscountsOfWeek || []),
]);

function cleanName(name) {
  return String(name || "").replace(/\s*\.\s*$/u, "").trim();
}

// Проверка, что локальное фото есть
const imgDir = join(srcRoot, "products-img");
const filesOnDisk = new Set(readdirSync(imgDir));

const products = rawProducts.map((p) => {
  const imgLocal = String(p["img-local"] || "");
  const ext = extname(imgLocal).toLowerCase() || ".png";
  const badge = sales.has(p.slug) ? "sale" : news.has(p.slug) ? "new" : hits.has(p.slug) ? "hit" : null;
  const formatKey = FORMAT_KEYS[String(p.format || "").toLowerCase().trim()] || String(p.format || "").trim().toLowerCase() || "товар";
  return {
    id: p.slug,
    name: cleanName(p.name),
    format: FORMAT_LABELS[formatKey] || cleanName(p.format),
    formatKey,
    volume: p.volume || "",
    tagline: cleanName(p.purpose),
    category: cleanName(p.category),
    categories: (p.categories || []).map((c) => ({ slug: c.slug, name: cleanName(c.name) })),
    price: Number(p.price) || 0,
    img: "/images/products/" + basename(imgLocal),
    imgLocal: basename(imgLocal),
    imgOnDisk: filesOnDisk.has(basename(imgLocal)),
    composition: (p.composition || "").trim(),
    how: (p.how || "").trim(),
    availability: p.availability || "В наличии",
    badge,
    badges: [sales.has(p.slug) ? "sale" : null, news.has(p.slug) ? "new" : null, hits.has(p.slug) ? "hit" : null].filter(Boolean),
    url: p.url || "",
  };
});

// Копируем фото в public/images/products
const publicDir = join(root, "public", "images", "products");
mkdirSync(publicDir, { recursive: true });
let copied = 0, missing = [];
for (const p of products) {
  const src = join(imgDir, p.imgLocal);
  const dst = join(publicDir, p.imgLocal);
  if (existsSync(src)) {
    copyFileSync(src, dst);
    copied++;
  } else {
    missing.push(p.slug);
  }
}

// Категории для чипов каталога: из структуры, в порядке меню
const catByName = new Map((structure.categories || []).map((c) => [c.slug, c]));
const menuOrder = structure.menuOrder || [];
const categories = menuOrder
  .map((slug) => {
    const c = catByName.get(slug);
    if (!c) return null;
    return {
      slug,
      name: cleanName(c.name),
      parent: c.parent || "",
      products: (c.products || []).length,
    };
  })
  .filter(Boolean);

// Секции главной: с полными объектами товаров
const productBySlug = new Map(products.map((p) => [p.slug || p.id, p]));
const homeSections = (structure.homeSections || []).map((s) => ({
  title: cleanName(s.title),
  items: (s.products || []).map((slug) => productBySlug.get(slug)).filter(Boolean),
}));

const catalog = {
  brand: "PHYTOTAB",
  source: structure.source || "phytotab.ru",
  parsedAt: structure.parsedAt || "",
  categories,
  homeSections,
  collections: {
    hits: (structure.collections?.hits || []).map((s) => productBySlug.get(s)).filter(Boolean),
    news: (structure.collections?.new || []).map((s) => productBySlug.get(s)).filter(Boolean),
    sale: (structure.collections?.sale || []).map((s) => productBySlug.get(s)).filter(Boolean),
  },
  notes: structure.notes || [],
};

writeFileSync(join(root, "data", "products.json"), JSON.stringify(products, null, 2) + "\n", "utf8");
writeFileSync(join(root, "data", "catalog.json"), JSON.stringify(catalog, null, 2) + "\n", "utf8");

console.log(`products: ${products.length} | categories: ${categories.length} | homeSections: ${homeSections.length}`);
console.log(`photos copied: ${copied} | missing: ${missing.length ? missing.join(", ") : "none"}`);
console.log(`product img files missing on disk: ${products.filter((p) => !p.imgOnDisk).map((p) => p.slug).join(", ") || "none"}`);