"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductTile from "./ProductTile";
import { filterProducts, products } from "../../lib/shop";
import { FORMATS, PRICE_BANDS, SORTS } from "../../lib/site";
import catalogData from "../../data/catalog.json";

const COLLECTIONS = [
  { key: "all", label: "Все товары" },
  { key: "sale", label: "Скидки недели" },
  { key: "hits", label: "Хиты" },
  { key: "news", label: "Новинки" },
];

const BADGE_TEXT = { sale: "Скидка недели", hit: "Хит", new: "Новинка" };

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition ${
        active
          ? "border-leaf bg-leaf text-paper"
          : "border-line bg-cream text-ink/70 hover:border-leaf/60 hover:text-leaf"
      }`}
    >
      {children}
    </button>
  );
}

function toggle(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function initialFromUrl(param) {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get(param);
  return value || null;
}

export default function CatalogView() {
  const [collection, setCollection] = useState("all");
  const [category, setCategory] = useState(() => initialFromUrl("category"));
  const [formats, setFormats] = useState([]);
  const [price, setPrice] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  // Переход с главной по подборке/категории — фильтр ставится после монтирования.
  useEffect(() => {
    const c = initialFromUrl("category");
    if (c) setCategory(c);
    const col = initialFromUrl("collection");
    if (col === "sale" || col === "hits" || col === "news") setCollection(col);
    const q = initialFromUrl("q");
    if (q) setQuery(q);
  }, []);

  const visible = useMemo(
    () =>
      filterProducts({
        collection,
        category,
        formats,
        price,
        query,
        sort,
      }),
    [collection, category, formats, price, query, sort]
  );

  const categories = catalogData.categories || [];

  const hasFilters =
    collection !== "all" ||
    category !== null ||
    formats.length > 0 ||
    price !== "all" ||
    query.trim() !== "";
  const reset = () => {
    setCollection("all");
    setCategory(null);
    setFormats([]);
    setPrice("all");
    setQuery("");
    setSort("default");
  };

  const activeCatName = categories.find((c) => c.slug === category)?.name || null;

  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-10">
        <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
          <Link href="/" className="transition hover:text-leaf">Главная</Link>
          <span aria-hidden="true"> / Каталог</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">
              {products.length} товара в каталоге
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Каталог <span className="text-leaf">PHYTOTAB</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/60">
              Фитосборы, грибы, витамины и наборы по системе Евгения Козлова. Фильтры по разделу,
              формату и цене, поиск по названию и составу, подборки «Хиты», «Новинки» и «Скидки недели».
            </p>
          </div>
          <span className="rounded-full border border-sage/50 bg-sageSoft/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-leafDark">
            доставка СДЭК по России · самовывоз в Москве
          </span>
        </div>

        <h2 className="sr-only">Все товары каталога PHYTOTAB</h2>

        {/* Поиск + сортировка */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Поиск по каталогу</span>
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 3.5 3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск: иммунитет, коллаген, грибы…"
              className="field py-3 pl-11"
            />
          </label>
          <div className="flex gap-3">
            <label className="flex-1 sm:flex-none">
              <span className="sr-only">Цена</span>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="field w-full sm:w-auto"
              >
                {PRICE_BANDS.map((b) => (
                  <option key={b.key} value={b.key}>
                    Цена: {b.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-1 sm:flex-none">
              <span className="sr-only">Сортировка</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="field w-full sm:w-auto">
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Разделы каталога */}
        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">Раздел</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Разделы каталога">
            <Chip active={category === null} onClick={() => setCategory(null)}>
              Все разделы
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(category === c.slug ? null : c.slug)}>
                {c.name.toLowerCase()} · {c.products}
              </Chip>
            ))}
          </div>
        </div>

        {/* Подборки */}
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Подборки">
          {COLLECTIONS.map((c) => (
            <Chip key={c.key} active={collection === c.key} onClick={() => setCollection(c.key)}>
              {c.label}
            </Chip>
          ))}
        </div>

        {/* Формат */}
        <div className="mt-4">
          <fieldset>
            <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">Формат</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <Chip
                  key={f.key}
                  active={formats.includes(f.key)}
                  onClick={() => setFormats((prev) => toggle(prev, f.key))}
                >
                  {f.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-[14px] font-semibold text-ink/70">
            Найдено: <span className="font-extrabold text-ink">{visible.length}</span>{" "}
            {visible.length === 1 ? "товар" : visible.length >= 2 && visible.length <= 4 ? "товара" : "товаров"}
            {activeCatName ? (
              <>
                {" "}в разделе <span className="font-extrabold text-leaf">{activeCatName.toLowerCase()}</span>
              </>
            ) : null}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-line bg-cream px-4 py-1.5 text-[13px] font-bold text-ink/60 transition hover:border-honey hover:text-honeyDark"
            >
              Сбросить фильтры
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-line bg-cream p-10 text-center">
            <p className="font-display text-2xl font-semibold">По вашему запросу ничего нет</p>
            <p className="mt-2 text-[14px] text-ink/60">Попробуйте сбросить фильтры или изменить запрос.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-full bg-leaf px-6 py-2.5 text-[15px] font-bold text-paper transition hover:bg-leafDark"
            >
              Показать все товары
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductTile key={product.id} product={product} badgeText={BADGE_TEXT} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}