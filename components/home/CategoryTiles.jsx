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
  // Арт дизайнера, блоки 10–11 (ICON-28..32): заливка фирменным зелёным,
  // светло-зелёный акцент и янтарная деталь; «вырезы» кремовым.
  const G1 = "#207D44";
  const G2 = "#78AA36";
  const G3 = "#E8963A";
  const CARVE = "#F7F3EA";
  const common = { viewBox: "0 0 64 64", className: "h-14 w-14", "aria-hidden": true };
  if (slug === "dlya-kozhi-volos-i-nogtej") {
    return (
      <svg {...common}>
        <path d="M17 36 C14 20 22 8 32 8 C42 8 50 20 47 36 C49 30 47 22 32 21.5 C17 22 15 30 17 36 Z" fill={G1} />
        <path d="M18.5 33 C18.5 24 24 18.5 32 18.5 C40 18.5 45.5 24 45.5 33 C45.5 42 40 48.5 32 48.5 C24 48.5 18.5 42 18.5 33 Z" fill={CARVE} />
        <path d="M22 20 Q26 15.5 32 15.5 Q38 15.5 42 20" stroke={G2} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M26 32 Q28 30.2 30 32 M34 32 Q36 30.2 38 32" stroke={G1} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M28.5 39.5 Q32 42.5 35.5 39.5" stroke={G1} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="24.5" cy="36.5" r="1.8" fill={G2} opacity="0.55" />
        <path d="M45 36 C49 34 53 36 53 41 C53 46.5 48 50 42.5 49 C39.5 48.4 38.5 45.5 40 43.5 L44 40.5 Z" fill={G3} />
        <path d="M42.5 39.5 L46.5 44.5 M45 38 L49 43 M47.5 37 L51 41.5" stroke={CARVE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="14" r="2" fill={G2} />
      </svg>
    );
  }
  if (slug === "immunity") {
    return (
      <svg {...common}>
        <path d="M32 6L53 14V31C53 45 45 54 32 58C19 54 11 45 11 31V14Z" fill={G1} />
        <rect x="29" y="20" width="6" height="22" rx="2.4" fill={CARVE} />
        <rect x="21" y="28" width="22" height="6" rx="2.4" fill={CARVE} />
        <path d="M49 8L50.8 12.2L55 14L50.8 15.8L49 20L47.2 15.8L43 14L47.2 12.2Z" fill={G2} />
        <circle cx="17" cy="19" r="3.2" fill={G3} />
      </svg>
    );
  }
  if (slug === "gastrointestinal") {
    return (
      <svg {...common}>
        <path d="M29 10 C38 10 46 17 46 27 C46 33.5 43 37 40.5 41 C38.8 44 39.5 47.5 35.5 50.5 C30 54.5 21.5 51.5 21.5 43.5 C21.5 38.5 24.5 36 25.5 31 C26.5 25.5 24.5 21 25.5 16 C26.2 12.5 26.8 10 29 10 Z" fill={G1} />
        <path d="M40 20 C42.5 26 41.5 32 37.5 37" stroke={G2} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <circle cx="31" cy="24" r="2.5" fill={G3} />
        <circle cx="33" cy="44" r="2.5" fill={G3} />
        <path d="M28.5 15 Q31 14 33.5 15.5" stroke={CARVE} strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (slug === "antistress") {
    return (
      <svg {...common}>
        <circle cx="32" cy="34" r="22" fill={G1} />
        <circle cx="32" cy="34" r="15" stroke={G2} strokeWidth="2.6" fill="none" />
        <path d="M24 36Q32 44 40 36" stroke={CARVE} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="29" r="2" fill={CARVE} />
        <circle cx="38" cy="29" r="2" fill={CARVE} />
        <path d="M50 6L52 11L57 13L52 15L50 20L48 15L43 13L48 11Z" fill={G3} />
        <circle cx="13" cy="15" r="2.4" fill={G2} />
      </svg>
    );
  }
  if (slug === "antiparasitic") {
    return (
      <svg {...common}>
        <rect x="15" y="13" width="21" height="11" rx="5.5" fill={G1} />
        <path d="M19 12.5 V9.5 M24.5 12 V8.5 M30 12 V8.5 M34 12.5 V9.5 M19 24.5 V27.5 M24.5 25 V28.5 M30 25 V28.5 M34 24.5 V27.5" stroke={G1} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="18.5" r="2.2" fill={CARVE} />
        <circle cx="31" cy="16.5" r="1.4" fill={G3} />
        <circle cx="47" cy="16" r="5.5" fill={G2} />
        <path d="M43 11.5 L41.5 9 M47 10.2 V7.5 M51 11.5 L52.5 9 M41.5 20 L40 22.5 M47 21.8 V24.5 M52.5 20 L54 22.5" stroke={G2} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="45.5" cy="15" r="1.3" fill={G3} />
        <circle cx="49" cy="17.5" r="1.1" fill={G3} />
        <path d="M12 45 Q19 36 26 45 T40 45 T54 45" stroke={G1} strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="45" r="3.4" fill={G1} />
        <circle cx="11" cy="44" r="1" fill={G3} />
        <circle cx="33" cy="53" r="2" fill={G2} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M33 9 C23 9 15.5 17 15.5 27 C15.5 30.2 16.3 32.8 17.6 34.8 L16.6 36.4 C16 37.4 16.6 38.4 17.6 38.6 L18.2 39.8 C17.8 40.8 18.6 41.6 19.8 41.6 C19.6 43 20.8 44 22.4 44 L22.6 53 H39 V43.5 C45.5 40.5 50 34 50 26 C50 16 43 9 33 9 Z" fill={G1} />
      <path d="M23 31 C21 22 27 15.5 33.5 15.5 C40.5 15.5 45.5 20.5 45.5 27.5 C45.5 31.5 43 34 39.5 34 H27.5 C25.3 34 23.7 32.8 23 31 Z" fill={G2} />
      <path d="M33.8 16 C32.3 21.5 34.8 28 33.2 33.8" stroke={G1} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M26.5 23.5 Q29.5 21.3 32.3 23.3 M25.8 28.5 Q29 26.8 32 28.3 M37 20.5 Q40.5 21.3 41.8 24.3 M36.2 26.5 Q39.5 25.8 41.5 27.8" stroke={CARVE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M47 4.5 L48.4 7.6 L51.5 9 L48.4 10.4 L47 13.5 L45.6 10.4 L42.5 9 L45.6 7.6 Z" fill={G3} />
      <circle cx="54.5" cy="14.5" r="1.8" fill={G2} />
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
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sageSoft/60 ring-1 ring-leaf/20 transition group-hover:ring-leaf/40">
                    <Illustration slug={category.slug} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block font-display text-[20px] font-semibold leading-tight text-ink">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-[14px] leading-snug text-secondary">{category.note}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sageSoft/50 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-wider text-leafDark">
                      {count} {plural(count)}
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2.5 8h9.5M8.6 4.6l3.8 3.4-3.8 3.4" strokeLinecap="round" strokeLinejoin="round" />
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