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
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sageSoft text-leaf">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
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
