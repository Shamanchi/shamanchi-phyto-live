"use client";

import { useShop } from "../ShopContext";

/** Сердце «в избранное»: состояние в ShopContext + localStorage, бейдж в шапке. */
export default function FavoriteButton({ productId, label = "товар", className = "", classNameActive = "" }) {
  const { hasFavorite, toggleFavorite } = useShop();
  const active = hasFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      aria-pressed={active}
      aria-label={active ? `Убрать из избранного: ${label}` : `Добавить в избранное: ${label}`}
      title={active ? "В избранном" : "В избранное"}
      className={active ? classNameActive || className : className}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </button>
  );
}
