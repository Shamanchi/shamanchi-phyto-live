import Link from "next/link";
import Reveal from "../Reveal";
import catalogData from "../../data/catalog.json";

/**
 * Категории с тёплыми SVG-иллюстрациями на первом экране (пункт 2.11 ТЗ):
 * навигация по боли клиента вместо серой полосы доверия. Каждая карточка ведёт
 * в каталог с применённым фильтром раздела. Список — 6 ключевых категорий.
 */
const CATEGORIES = [
  {
    slug: "dlya-kozhi-volos-i-nogtej",
    name: "Кожа, волосы, ногти",
    note: "Коллаген, кремний и витамины для внешней красоты",
  },
  {
    slug: "immunity",
    name: "Иммунитет",
    note: "Грибы, сборы и витамины для защиты организма",
  },
  {
    slug: "gastrointestinal",
    name: "Здоровье ЖКТ",
    note: "Сборы и клетчатка для комфортного пищеварения",
  },
  {
    slug: "antistress",
    name: "Антистресс",
    note: "Мягкая поддержка нервной системы и сна",
  },
  {
    slug: "antiparasitic",
    name: "Антипаразитарные",
    note: "Фитохитодезы и сборы по традиционным рецептурам",
  },
  {
    slug: "brain",
    name: "Активация мозга",
    note: "Поддержка памяти, внимания и ясности мышления",
  },
];

function countFor(slug) {
  const found = (catalogData.categories || []).find((c) => c.slug === slug);
  return found ? found.products : 0;
}

function plural(items) {
  if (items % 10 === 1 && items % 100 !== 11) return "товар";
  if (items % 10 >= 2 && items % 10 <= 4 && (items % 100 < 12 || items % 100 > 14)) return "товара";
  return "товаров";
}

function Illustration({ slug }) {
  // Насыщенная двухцветная графика в фирменном зелёном (правка 3, п. 3): заливка, не линии.
  const G1 = "#207D44";
  const G2 = "#78AA36";
  const G3 = "#E8963A";
  const CARVE = "#F7F3EA";
  const common = { viewBox: "0 0 64 64", className: "h-14 w-14", "aria-hidden": true };
  if (slug === "dlya-kozhi-volos-i-nogtej") {
    return (
      <svg {...common}>
        <path d="M32 7c9.6 0 15.8 5.6 15.8 13.7 0 8.9-6.4 15.4-15.8 22.6-9.4-7.2-15.8-13.7-15.8-22.6C16.2 12.6 22.4 7 32 7Z" fill={G1} />
        <path d="M32 13c0 8-2.4 14.6-8.2 20.4M32 13c0 8 2.4 14.6 8.2 20.4" stroke={G2} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M44.6 37.4c3.6 4.1 5.4 7.4 5.4 10a5.4 5.4 0 1 1-10.8 0c0-2.6 1.8-5.9 5.4-10Z" fill={G3} />
      </svg>
    );
  }
  if (slug === "immunity") {
    return (
      <svg {...common}>
        <path d="M32 8 47 13v11.6c0 11.2-6.6 19.6-15 24.4-8.4-4.8-15-13.2-15-24.4V13l15-5Z" fill={G1} />
        <path d="M26.6 30.8h10.8M32 25.4v10.8" stroke={CARVE} strokeWidth="4" strokeLinecap="round" />
        <path d="M48 43.5l2 4.2 4.6.8-3.3 3.2.8 4.6-4.1-2.2-4.1 2.2.8-4.6-3.3-3.2 4.6-.8 2-4.2Z" fill={G2} />
      </svg>
    );
  }
  if (slug === "gastrointestinal") {
    return (
      <svg {...common}>
        <path d="M17 27h30v7.5c0 8.4-6.7 15-15 15s-15-6.6-15-15V27Z" fill={G1} />
        <path d="M46.5 29.5a8.5 8.5 0 0 1 0 13" stroke={G1} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M13 52h38" stroke={G2} strokeWidth="5" strokeLinecap="round" />
        <path d="M21 19.5c-2.2-3.8 2-6.4-.3-10M32 19.5c-2.2-3.8 2-6.4-.3-10M43 19.5c-2.2-3.8 2-6.4-.3-10" stroke={G3} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (slug === "antistress") {
    return (
      <svg {...common}>
        <path fillRule="evenodd" d="M32 6a26 26 0 1 1 0 52 26 26 0 0 1 0-52Zm5.4 10.6a15.8 15.8 0 1 0 0 30.8 12.4 12.4 0 0 1 0-30.8Z" fill={G1} />
        <path d="M16 16.5l1.9 4.6 4.6 1.9-4.6 1.9-1.9 4.6-1.9-4.6-4.6-1.9 4.6-1.9 1.9-4.6Z" fill={G2} />
        <circle cx="47" cy="14" r="2.6" fill={G3} />
        <path d="M24.5 42.5c2 2.6 4.6 3.9 7.5 3.9s5.5-1.3 7.5-3.9" stroke={G2} strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (slug === "antiparasitic") {
    return (
      <svg {...common}>
        <path d="M32 8c9 6.4 14 13 14 21.6 0 10.6-6.3 17.9-14 22.4-7.7-4.5-14-11.8-14-22.4C18 21 23 14.4 32 8Z" fill={G1} />
        <path d="M32 15v29" stroke={G2} strokeWidth="3" strokeLinecap="round" />
        <circle cx="24.2" cy="24.6" r="2.2" fill={G3} />
        <circle cx="39.8" cy="24.6" r="2.2" fill={G3} />
        <circle cx="32" cy="32.5" r="2.2" fill={G3} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="32" cy="23" r="13.5" fill={G1} />
      <path d="M26 38.5h12l2.2 9.5H23.8L26 38.5Z" fill={G2} />
      <path d="M32 16.5c2.4 2 3.6 4.1 3.6 6.3a3.6 3.6 0 1 1-7.2 0c0-2.2 1.2-4.3 3.6-6.3Z" fill={G3} />
      <path d="M32 4v3.4M14.5 13.6l-3-3M49.5 13.6l3-3M7.5 27.5H11M53 27.5h3.5" stroke={G2} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
export default function CategoryTiles() {
  return (
    <section
      id="categories"
      data-testid="category-tiles"
      aria-labelledby="categories-title"
      className="border-y border-line/70 bg-cream/60 py-12 sm:py-14"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">каталог по задаче</p>
              <h2 id="categories-title" className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Что вас <span className="text-leaf">беспокоит?</span>
              </h2>
            </div>
            <Link
              href="/catalog/"
              className="rounded-full border border-line bg-paper px-5 py-2.5 text-[14px] font-bold text-ink transition hover:border-leaf hover:text-leafDark"
            >
              Весь каталог →
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/90">
            Выберите свою задачу — покажем подходящие фитосборы, грибы и витамины из реального каталога
            PHYTOTAB, который проверяет врач-фитотерапевт Евгений Козлов.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => {
            const count = countFor(category.slug);
            return (
              <Reveal key={category.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/catalog/?category=${encodeURIComponent(category.slug)}`}
                  className="group flex h-full items-start gap-4 rounded-3xl border border-line glass-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-leaf/60 hover:shadow-lift"
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream ring-1 ring-line/70 transition group-hover:bg-sageSoft/40">
                    <Illustration slug={category.slug} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block font-display text-[20px] font-semibold leading-tight text-ink">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-[14px] leading-snug text-secondary">{category.note}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sageSoft/50 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-wider text-leafDark">
                      {count} {plural(count)}
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 8h9M8 4l4 4-4 4" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}