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
        <path d="M32 8C44 13 51 25 47.5 37C44 48 27 53 19 44C10.5 34.5 18 14 32 8Z" fill={G1} />
        <path d="M31 14C32 26 29.5 37 24 45" stroke={CARVE} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M30 25Q36 24 40 20M28 34Q33.5 33.5 37 30" stroke={G2} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M44 44C45.8 46.8 47.5 48.6 47.5 51A3.5 3.5 0 1 1 40.5 51C40.5 48.6 42.2 46.8 44 44Z" fill={G3} />
        <path d="M42.8 52Q42.8 53.8 44.6 53.8" stroke={CARVE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
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
        <path d="M13 22H51C51 41 44 53 32 53C20 53 13 41 13 22Z" fill={G1} />
        <path d="M17 22H47C47 25 45 27 42 27H22C19 27 17 25 17 22Z" fill={CARVE} />
        <path d="M19 35Q25 30 32 35T45 35" stroke={G2} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <circle cx="25.5" cy="31.5" r="2.6" fill={G3} />
        <circle cx="38.5" cy="31.5" r="2.6" fill={G3} />
        <circle cx="32" cy="44" r="2.6" fill={G3} />
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
        <path d="M32 7C47 12 55 27 50 41C45 53 26 58 17 48C7 37 15 14 32 7Z" fill={G1} />
        <path d="M32 13C33 26 30 38 24 47" stroke={CARVE} strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M31 24Q37 23 41 19M29 33Q35 33 40 29" stroke={G2} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="40" r="3" fill={G3} />
        <circle cx="35" cy="47" r="2.4" fill={G3} />
        <circle cx="46" cy="31" r="2.2" fill={G2} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M17 53C17 36 20 19 31 19C41 19 47 29 47 39C47 48 41 53 33 53Z" fill={G1} />
      <path d="M25 33C23 27 29 23 33 25C37 22 43 26 41 31C44 34 41 39 37 38C36 42 30 43 28 39C23 40 21 34 25 33Z" fill={G2} />
      <path d="M28 31Q32 28 36 31M29 36Q33 34 37 36" stroke={CARVE} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M31 13C31.8 10.5 33.2 10.5 34 13C36 13.5 36 15.5 34 16C33.2 18.5 31.8 18.5 31 16C29 15.5 29 13.5 31 13Z" fill={G3} />
      <path d="M40 8L40 12M46 11L43 14M48 17L44 17" stroke={G3} strokeWidth="2.2" strokeLinecap="round" fill="none" />
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