// Чистые помощники каталога/корзины. Всё строится на data/products.json
// и словарях из lib/site.js; бренд в код не зашит.
import products from "../data/products.json";
import { FORMATS, PRICE_BANDS, SORTS, SHOP } from "./site";

export function productById(id) {
  return products.find((p) => p.id === id);
}

export function isAvailable(product) {
  return !product || product.availability !== "Нет в наличии";
}

export function formatLabel(key) {
  const item = FORMATS.find((f) => f.key === key);
  return item ? item.label : key;
}

export function collectionItems(collection) {
  if (collection === "hits") return products.filter((p) => (p.badges || []).includes("hit"));
  if (collection === "news") return products.filter((p) => (p.badges || []).includes("new"));
  if (collection === "sale") return products.filter((p) => (p.badges || []).includes("sale"));
  return products;
}

export function categoryBySlug(slug) {
  const item = products.find((p) => (p.categories || []).some((c) => c.slug === slug));
  if (!item) return null;
  return item.categories.find((c) => c.slug === slug) || null;
}

export function priceBandFor(key) {
  return PRICE_BANDS.find((b) => b.key === key) || PRICE_BANDS[0];
}

function matchesPrice(product, band) {
  if (!band || !band.key || band.key === "all") return true;
  const min = band.min ?? 0;
  const max = band.max ?? Infinity;
  return product.price >= min && product.price < max;
}

export function filterProducts({
  collection = "all",
  category = null,
  formats = [],
  price = "all",
  query = "",
  sort = "default",
} = {}) {
  let list = collectionItems(collection);
  if (category) list = list.filter((p) => (p.categories || []).some((c) => c.slug === category));
  if (formats.length) list = list.filter((p) => formats.includes(p.formatKey));
  const band = priceBandFor(price);
  if (band) list = list.filter((p) => matchesPrice(p, band));
  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.format || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.composition || "").toLowerCase().includes(q)
    );
  }
  const sortKey = SORTS.find((s) => s.key === sort) ? sort : "default";
  const byName = (a, b) => a.name.localeCompare(b.name, "ru");
  const sorted = [...list];
  if (sortKey === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (sortKey === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else if (sortKey === "name") sorted.sort(byName);
  else {
    // «Сначала популярные»: скидка недели, хиты, новинки, затем по алфавиту
    const rank = (p) => {
      const badges = p.badges || [];
      if (badges.includes("sale")) return 0;
      if (badges.includes("hit")) return 1;
      if (badges.includes("new")) return 2;
      return 3;
    };
    sorted.sort((a, b) => rank(a) - rank(b) || byName(a, b));
  }
  return sorted;
}

export function similarProducts(product, limit = 3) {
  const rest = products.filter((p) => p.id !== product.id);
  const cats = (product.categories || []).map((c) => c.slug);
  const byCat = rest.filter((p) => (p.categories || []).some((c) => cats.includes(c.slug)));
  const byFormat = rest.filter((p) => p.formatKey === product.formatKey);
  const seen = new Set();
  const result = [];
  for (const group of [byCat, byFormat, rest]) {
    for (const p of group) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      result.push(p);
      if (result.length >= limit) return result;
    }
  }
  return result;
}

export function cartLines(items) {
  return products
    .filter((p) => (items[p.id] || 0) > 0)
    .map((p) => ({ product: p, qty: Math.min(99, items[p.id]) }));
}

export function normalizePromo(raw) {
  if (!raw) return null;
  const code = String(raw).trim().toUpperCase();
  const rule = SHOP.promo[code];
  if (!rule || rule.type !== "percent") return null;
  return { code, percent: rule.value };
}

export function discountFor(subtotal, promo) {
  if (!promo || !promo.percent || subtotal <= 0) return 0;
  return Math.round((subtotal * promo.percent) / 100);
}

// СДЭК бесплатно при сумме заказа после скидок от порога (условия магазина).
export function deliveryCost(deliveryKey, subtotalAfterDiscount = 0) {
  const item = SHOP.delivery.find((d) => d.key === deliveryKey);
  if (!item) return 0;
  if (deliveryKey === "cdek" && subtotalAfterDiscount >= SHOP.freeDeliveryThresholds.central.from) {
    return 0;
  }
  return item.cost;
}

export function deliveryOption(deliveryKey) {
  return SHOP.delivery.find((d) => d.key === deliveryKey) || null;
}

export function makeOrderNumber() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear().toString().slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${String(now.getTime()).slice(-4)}`;
  return `PT-${stamp}`;
}

export { products, FORMATS, PRICE_BANDS, SORTS, SHOP };