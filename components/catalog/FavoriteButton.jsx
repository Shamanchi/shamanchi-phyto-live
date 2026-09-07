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
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        {active ? (
          <path d="M12 19.8C12 19.8 4.6 15.2 4.6 9.6C4.6 6.7 6.9 4.7 9.3 4.7C10.6 4.7 11.5 5.3 12 6.1C12.5 5.3 13.4 4.7 14.7 4.7C17.1 4.7 19.4 6.7 19.4 9.6C19.4 15.2 12 19.8 12 19.8Z" fill="currentColor" />
        ) : (
          <>
            <path d="M12 19.8C12 19.8 4.6 15.2 4.6 9.6C4.6 6.7 6.9 4.7 9.3 4.7C10.6 4.7 11.5 5.3 12 6.1C12.5 5.3 13.4 4.7 14.7 4.7C17.1 4.7 19.4 6.7 19.4 9.6C19.4 15.2 12 19.8 12 19.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <circle cx="12" cy="12.8" r="1.6" fill="#E8963A" />
          </>
        )}
      </svg>
    </button>
  );
}
