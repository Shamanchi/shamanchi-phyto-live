"use client";

import { useEffect } from "react";
import Link from "next/link";
import products from "../data/products.json";
import { asset, formatPrice, SHOP } from "../lib/site";
import { useShop } from "./ShopContext";

export default function CartDrawer() {
  const { items, setQty, remove, clear, count, subtotal, discount, total, cartOpen, setCartOpen } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [cartOpen, setCartOpen]);

  const rows = products
    .filter((p) => items[p.id] > 0)
    .map((p) => ({ product: p, qty: items[p.id] }));

  return (
    <div
      className={`fixed inset-0 z-[90] transition-opacity duration-300 ${cartOpen ? "opacity-100" : "invisible opacity-0"}`}
      aria-hidden={!cartOpen}
      inert={!cartOpen}
    >
      <button
        type="button"
        aria-label="Закрыть корзину"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
        tabIndex={-1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            Корзина {count > 0 && <span className="text-base font-bold text-khaki">· {count}</span>}
          </h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Закрыть"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink/90 transition hover:border-honey hover:text-honeyDark"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l10 10M15 5 5 15" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {rows.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-cream to-sageSoft/70 ring-1 ring-leaf/15">
                <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
                  <path d="M23.5 22v-3.6a8.5 8.5 0 0 1 17 0V22" stroke="#78AA36" strokeWidth="4.4" fill="none" />
                  <path d="M19 22.5h26l1.6 24.4a6.8 6.8 0 0 1-6.8 7.1H24.2a6.8 6.8 0 0 1-6.8-7.1l1.6-24.4Z" fill="#207D44" />
                  <path d="M32 27.6c2.7 1.3 4.3 3.7 4.3 6.6 0 2.9-1.6 5.3-4.3 6.6-2.7-1.3-4.3-3.7-4.3-6.6 0-2.9 1.6-5.3 4.3-6.6Z" fill="#E8963A" />
                  <path d="M32 29v9.8" stroke="#FBF8F1" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M45.5 13.2l1.6 3.2 3.6.8-2.6 2.4.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.4 3.6-.8 1.6-3.2Z" fill="#78AA36" />
                </svg>
              </span>
              <div>
                <p className="font-display text-xl font-semibold">Пока пусто</p>
                <p className="mt-1 text-sm text-secondary">Загляните в каталог — там сборы, грибы и витамины под вашу задачу.</p>
              </div>
              <Link
                href="/catalog/"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-leaf px-6 py-2.5 text-[15px] font-bold text-paper transition hover:bg-leafDark"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {rows.map(({ product, qty }) => {
                const unit = product.format + (product.volume ? ` · ${product.volume}` : "");
                return (
                  <li key={product.id} className="flex gap-3 rounded-2xl border border-line bg-cream p-3">
                    <img
                      src={asset(product.img)}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[17px] font-semibold leading-tight">{product.name}</p>
                      <p className="mt-0.5 text-[12px] text-khaki">
                        {formatPrice(product.price)} / {SHOP.unitLabel} · {unit}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-line bg-paper">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            aria-label={`Убрать один ${product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-ink/90 transition hover:text-leaf"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[15px] font-extrabold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            aria-label={`Добавить один ${product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-ink/90 transition hover:text-leaf"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[15px] font-extrabold text-honeyDark">{formatPrice(product.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="flex justify-between text-[13px] font-semibold text-ink/90">
                <span>Скидка по промокоду</span>
                <span className="text-leaf">−{formatPrice(discount)}</span>
              </li>
            </ul>
          )}
        </div>

        {rows.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="flex items-center justify-between text-[17px]">
              <span className="font-bold">Итого</span>
              <span className="text-2xl font-extrabold text-ink">{formatPrice(total)}</span>
            </div>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={clear}
                className="rounded-full border border-line bg-cream px-4 py-2.5 text-[13px] font-bold text-secondary transition hover:border-honey hover:text-honeyDark"
              >
                Очистить
              </button>
              <Link
                href="/checkout/"
                onClick={() => setCartOpen(false)}
                className="flex-1 rounded-full bg-honey px-5 py-2.5 text-center text-[15px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
              >
                Оформить заказ
              </Link>
            </div>
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-secondary">
              Доставка СДЭК по России · самовывоз в Москве · оплата после подтверждения менеджером
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}