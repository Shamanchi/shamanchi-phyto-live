"use client";

import Link from "next/link";
import { asset } from "../lib/site";
import products from "../data/products.json";
import HeroLeaves from "./live/HeroLeaves";

const FEATURED = products.filter((p) => (p.badges || []).includes("hit")).slice(0, 4);
const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-28 sm:pt-32 lg:pb-16">
      {/* слой 2 «листья»: tsParticles, только первый экран и десктоп */}
      <HeroLeaves />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/50 bg-cream/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-khaki">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
            PHYTOTAB · магазин товаров здоровья
          </p>

          <h1 className="font-display text-[44px] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[64px]">
            Фитосборы врача
            <br />
            <span className="text-leaf">Евгения Козлова</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            Фитосборы, грибы, витамины и наборы по системе доктора. Практикующий
            врач-фитотерапевт и рецептуры, проверенные в работе с пациентами.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/60 sm:text-base">
            Сырьё из экологически чистых регионов России: травы с Алтая, из Крыма и
            Башкортостана, грибы — с собственной фермы. Понятный состав и способ применения
            на странице каждого товара.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/catalog/"
              className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-lg font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-[#BB7B1E]"
            >
              Смотреть каталог
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 10h12m0 0-5-5m5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/#shelves"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-transparent px-7 py-3 text-lg font-bold text-ink transition hover:border-leaf hover:text-leaf"
            >
              Подборки Евгения
            </Link>
          </div>

          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-khaki">
            {products.length} товара в каталоге · доставка СДЭК по России · самовывоз в Москве
          </p>
        </div>

        {/* Коллаж из реальных товаров каталога */}
        <div className="relative z-10 mx-auto w-full max-w-[440px]">
          <div className="relative grid grid-cols-2 gap-4">
            {FEATURED.map((product, i) => (
              <Link
                key={product.id}
                href={`/product/${product.id}/`}
                className={`overflow-hidden rounded-3xl border border-line bg-cream shadow-lift transition hover:-translate-y-1 ${ROTATIONS[i % ROTATIONS.length]}`}
                aria-label={product.name}
              >
                <img
                  src={asset(product.img)}
                  alt={product.name}
                  width={440}
                  height={440}
                  fetchPriority={i < 2 ? "high" : "low"}
                  className="aspect-square w-full object-cover"
                />
              </Link>
            ))}
            <span className="pointer-events-none absolute -right-3 -top-4 rounded-full bg-leaf px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-paper shadow-card">
              {products.length} товара
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}