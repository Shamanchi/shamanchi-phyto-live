"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "../ShopContext";
import { products } from "../../lib/shop";
import ProductTile from "../catalog/ProductTile";

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useShop();

  const favoriteProducts = useMemo(
    () => products.filter((p) => favoriteIds.includes(p.id)),
    [favoriteIds]
  );

  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-12">
        <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
          <Link href="/" className="transition hover:text-leaf">Главная</Link>
          <span aria-hidden="true"> / Избранное</span>
        </nav>

        <div className="mt-6 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">личный список</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Избранное {favoriteProducts.length > 0 && <span className="text-leaf">({favoriteProducts.length})</span>}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary">
            Сохранённые товары живут в этом браузере. Сердце на карточке или странице товара
            добавляет позицию сюда, бейдж в шапке показывает количество.
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-line bg-cream p-10 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-cream to-sageSoft/70 ring-1 ring-leaf/15">
              <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
                <path d="M32 54C32 54 10 40.5 10 24.5C10 16.9 15.9 11.5 22.6 11.5C26.7 11.5 29.9 13.5 32 16.6C34.1 13.5 37.3 11.5 41.4 11.5C48.1 11.5 54 16.9 54 24.5C54 40.5 32 54 32 54Z" fill="#207D44" />
                <path d="M32 28C34.2 31.2 36.4 33.4 36.4 36.4A4.4 4.4 0 1 1 27.6 36.4C27.6 33.4 29.8 31.2 32 28Z" fill="#E8963A" />
                <path d="M20 22Q21 17 26 16" stroke="#F7F3EA" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M50 12l2.5 2.5M56 6l-1.5 2.5" stroke="#78AA36" strokeWidth="2.6" strokeLinecap="round" />
                <circle cx="12" cy="42" r="2.2" fill="#78AA36" />
              </svg>
            </span>
            <p className="mt-5 font-display text-2xl font-semibold">Пока пусто</p>
            <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-secondary">
              Нажмите на сердечко у понравившегося товара — он появится здесь и будет доступен
              из шапки сайта на любой странице.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/catalog/"
                className="rounded-full bg-honey px-6 py-3 text-[15px] font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
              >
                Открыть каталог
              </Link>
              <Link
                href="/account/"
                className="rounded-full border border-line bg-paper px-6 py-3 text-[15px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
              >
                Мои заказы
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductTile key={product.id} product={product} onToggleFavorite={() => toggleFavorite(product.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
