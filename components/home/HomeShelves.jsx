"use client";

import Link from "next/link";
import catalogData from "../../data/catalog.json";
import ProductTile from "../catalog/ProductTile";
import Reveal from "../Reveal";

// Ссылка «все →» для секций: где раздел повторяет категорию каталога — ведём в неё.
const SECTION_CATEGORY = {
  "ГРИБЫ В ПОРОШКАХ": "griby-v-poroshkah",
  "ГРИБЫ В КАПСУЛАХ": "griby-v-kapsulah",
  "ВИТАМИНЫ И ДОБАВКИ": "vitaminy-i-dobavki",
  "ФИТОСБОРЫ": "fitosbory",
  "ФИТОХИТОДЕЗЫ | минимальный заказ от 2 штук": "fitohitodezy",
  "НАБОРЫ ПО СИСТЕМЕ | ЕВГЕНИЯ КОЗЛОВА": "combosets",
};

function cleanTitle(raw) {
  return String(raw || "").replace(/\s*\|.*$/u, "").trim();
}

export default function HomeShelves() {
  const sections = catalogData.homeSections || [];

  return (
    <section id="shelves" className="relative py-14 sm:py-16" aria-labelledby="shelves-title">
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">витрина</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="shelves-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Подборки <span className="text-leaf">магазина</span>
            </h2>
            <Link
              href="/catalog/"
              className="rounded-full border border-line bg-cream px-5 py-2.5 text-[14px] font-bold text-ink/70 transition hover:border-leaf hover:text-leaf"
            >
              Весь каталог →
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/60">
            Те же витрины, что на phytotab.ru: скидки недели, популярное, наборы по системе
            Евгения Козлова, грибы, витамины, фитосборы и фитохитодезы.
          </p>
        </Reveal>

        <div className="mt-8 space-y-10">
          {sections.map((section, si) => {
            const title = cleanTitle(section.title);
            const catSlug = SECTION_CATEGORY[section.title] || null;
            const href = catSlug ? `/catalog/?category=${encodeURIComponent(catSlug)}` : "/catalog/";
            if (!section.items || section.items.length === 0) return null;
            return (
              <Reveal key={section.title + si} delay={40}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h3>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leaf transition hover:text-leafDark"
                  >
                    Все →
                  </Link>
                </div>
                {section.title.includes("минимальный заказ") && (
                  <p className="mt-1 text-[13px] text-ink/60">
                    Минимальный заказ фитохитодезов — от 2 штук.
                  </p>
                )}
                <div className="mt-4 flex snap-x gap-5 overflow-x-auto pb-4" role="region" aria-label={title}>
                  {section.items.map((product) => (
                    <div key={product.id} className="w-[250px] shrink-0 snap-start sm:w-[270px]">
                      <ProductTile product={product} />
                    </div>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}