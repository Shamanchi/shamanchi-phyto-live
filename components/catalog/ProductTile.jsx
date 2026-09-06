"use client";

import { useState } from "react";
import Link from "next/link";
import { asset, formatPrice, SHOP } from "../../lib/site";
import { useShop } from "../ShopContext";
import FavoriteButton from "./FavoriteButton";

const BADGE_TEXT = {
  sale: "Скидка недели",
  hit: "Хит",
  new: "Новинка",
};

export default function ProductTile({ product }) {
  const { add } = useShop();
  const [added, setAdded] = useState(false);
  const inStock = product.availability !== "Нет в наличии";

  const handleAdd = () => {
    if (!inStock) return;
    add(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  const unit = `${product.format}${product.volume ? ` · ${product.volume}` : ""}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link
        href={`/product/${product.id}/`}
        className="relative block overflow-hidden border-b border-line/60"
      >
        <img
          src={asset(product.img)}
          alt={product.name}
          width={700}
          height={700}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper backdrop-blur ${
              product.badge === "sale" ? "bg-honeyDark" : product.badge === "hit" ? "bg-leafDark" : "bg-leaf"
            }`}
          >
            {BADGE_TEXT[product.badge] || product.badge}
          </span>
        )}
        {!inStock && (
          <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-secondary backdrop-blur">
            {SHOP.outLabel}
          </span>
        )}
      </Link>
      <FavoriteButton
        productId={product.id}
        label={product.name}
        className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-paper/95 text-leaf shadow-card transition hover:bg-leaf hover:text-paper"
        classNameActive="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-leaf bg-leaf text-paper shadow-card"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-display text-[19px] font-semibold leading-tight">
              <Link href={`/product/${product.id}/`} className="transition hover:text-leaf">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-[13px] font-semibold text-secondary">{unit}</p>

          </div>
          <p className="shrink-0 text-right">
            <span className="block text-[18px] font-extrabold text-honeyDark">{formatPrice(product.price)}</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-khaki">{SHOP.unitLabel}</span>
          </p>
        </div>
        <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className="flex gap-0.5 text-honeyDark" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <svg key={n} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M10 1.8l2.5 5 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8 2.5-5Z" />
              </svg>
            ))}
          </span>
          <span className="text-[13px] font-bold text-secondary">5,0 на Яндекс.Картах</span>
        </p>
        <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-ink/90">{product.tagline}</p>
        <div className="mt-4 flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inStock}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-bold transition ${
              !inStock
                ? "cursor-not-allowed border border-line bg-cream text-secondary"
                : added
                  ? "bg-leaf text-paper"
                  : "bg-honey text-ink hover:bg-honeyDark"
            }`}
          >
            {!inStock ? SHOP.outLabel : added ? "Добавлено ✓" : "В корзину"}
          </button>
          <Link
            href={`/product/${product.id}/`}
            className="inline-flex items-center justify-center rounded-full border border-line bg-paper px-3.5 py-2.5 text-[13px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
            aria-label={`Подробнее: ${product.name}`}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}