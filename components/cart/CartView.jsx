"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useShop } from "../ShopContext";
import { asset, formatPrice, SHOP } from "../../lib/site";

export default function CartView() {
  const { lines, setQty, remove, clear, count, subtotal, discount, total, promoCode, applyPromo } = useShop();
  const [promoInput, setPromoInput] = useState(promoCode || "");
  const [promoMsg, setPromoMsg] = useState("");
  const [quizProductId, setQuizProductId] = useState(null);

  // Подсветка товара, подобранного в квизе (сохраняется при переходе в корзину).
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pt-quiz-v1");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.productId) setQuizProductId(saved.productId);
      }
    } catch { /* нет доступа к localStorage — просто не подсвечиваем */ }
  }, []);

  const handleApply = () => {
    const ok = applyPromo(promoInput);
    setPromoMsg(ok ? "Промокод применён ✓" : "Промокод не найден.");
  };

  if (lines.length === 0) {
    return (
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-16 text-center sm:py-24">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cream to-sageSoft/70 ring-1 ring-leaf/15">
            <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
              <path d="M22 22V19a10 10 0 0 1 20 0v3" stroke="#207D44" strokeWidth="4" strokeLinecap="round" />
              <path d="M15 22h34l-3.5 26a5 5 0 0 1-5 4.3H23.4a5 5 0 0 1-4.9-4.3l-3.5-26Z" fill="#207D44" />
              <path d="M32 30C34 33.5 36.5 35.8 36.5 39A4.5 4.5 0 1 1 27.5 39C27.5 35.8 30 33.5 32 30Z" fill="#E8963A" />
              <path d="M30 41Q30 43.5 32.5 43.5" stroke="#F7F3EA" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 14l2.5 2.5M50 12l-2.5 2.5" stroke="#78AA36" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="52" cy="22" r="2.2" fill="#78AA36" />
            </svg>
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold">Корзина пока пуста</h1>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink/90">
            Добавьте товары из каталога — корзина умеет считать количество, промокод и итог,
            как в настоящем магазине.
          </p>
          <Link
            href="/catalog/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-lg font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
          >
            Открыть каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-10">
        <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
          <Link href="/" className="transition hover:text-leaf">Главная</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/catalog/" className="transition hover:text-leaf">Каталог</Link>
          <span aria-hidden="true"> / Корзина</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Корзина <span className="text-leaf">({count})</span>
          </h1>
          <button
            type="button"
            onClick={clear}
            className="rounded-full border border-line bg-cream px-4 py-2 text-[13px] font-bold text-secondary transition hover:border-honey hover:text-honeyDark"
          >
            Очистить корзину
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Строки */}
          <ul className="relative space-y-4">
            {lines.map(({ product, qty }) => {
              const unit = product.format + (product.volume ? ` · ${product.volume}` : "");
              const fromQuiz = quizProductId === product.id;
              return (
                <li
                  key={product.id}
                  data-quiz-recommended={fromQuiz ? "true" : undefined}
                  className={`relative flex flex-wrap gap-4 rounded-3xl border p-4 sm:flex-nowrap ${
                    fromQuiz
                      ? "border-honey/70 bg-honey/10 ring-2 ring-honey/60"
                      : "border-line bg-cream"
                  }`}
                >
                  {fromQuiz && (
                    <span className="absolute -top-2.5 left-4 rounded-full bg-honey px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow-card">
                      подобран в квизе
                    </span>
                  )}
                  <Link href={`/product/${product.id}/`} className="shrink-0">
                    <img
                      src={asset(product.img)}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="h-28 w-28 rounded-2xl object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display text-[20px] font-semibold leading-tight">
                          <Link href={`/product/${product.id}/`} className="transition hover:text-leaf">
                            {product.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-[12px] text-khaki">{unit}</p>
                      </div>
                      <p className="shrink-0 text-[17px] font-extrabold text-honeyDark">
                        {formatPrice(product.price * qty)}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-line bg-paper">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label={`Убрать один ${product.name}`}
                          className="grid h-10 w-10 place-items-center rounded-full text-ink/90 transition hover:text-leaf"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-extrabold">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label={`Добавить один ${product.name}`}
                          className="grid h-10 w-10 place-items-center rounded-full text-ink/90 transition hover:text-leaf"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-secondary transition hover:text-honeyDark"
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M2.8 4.2h10.4M5.8 4.2V3.1a1 1 0 0 1 1-1h2.4a1 1 0 0 1 1 1v1.1" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M4.3 4.2l.5 8.5a1.6 1.6 0 0 0 1.6 1.4h3.2a1.6 1.6 0 0 0 1.6-1.4l.5-8.5" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M6.6 7v4.5M9.4 7v4.5" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        Удалить
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
            <li>
              <Link
                href="/catalog/"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-[14px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
              >
                ← Продолжить покупки
              </Link>
            </li>
          </ul>

          {/* Итог */}
          <aside className="h-fit rounded-3xl border border-line bg-cream p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl font-semibold">Итого</h2>
            <dl className="mt-5 space-y-2.5 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-secondary">Товары ({count})</dt>
                <dd className="font-bold">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-leaf">
                  <dt>Скидка по промокоду</dt>
                  <dd className="font-bold">−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-[16px]">
                <dt className="font-bold">Сумма без доставки</dt>
                <dd className="text-xl font-extrabold text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-xl bg-sageSoft/40 p-3 text-[14px] leading-relaxed text-leafDark">
              Доставка рассчитывается на следующем шаге. СДЭК — бесплатно при заказе от 7 900 ₽
              (для большей части регионов России).
            </p>

            <div className="mt-5">
              <label htmlFor="promo-input" className="font-mono text-[10px] uppercase tracking-[0.14em] text-khaki">
                Промокод
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="promo-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoMsg("");
                  }}
                  placeholder="PHYTOTAB10"
                  className="field"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleApply}
                  className="shrink-0 rounded-full bg-leaf px-5 py-2.5 text-[14px] font-bold text-paper transition hover:bg-leafDark"
                >
                  Применить
                </button>
              </div>
              <p className="mt-2 min-h-4 text-[12.5px] font-semibold text-leaf">{promoMsg}</p>
              <p className="text-[12px] leading-relaxed text-secondary">{SHOP.promoHint}</p>
            </div>

            <Link
              href="/checkout/"
              className="mt-5 block rounded-full bg-honey px-6 py-3.5 text-center text-[17px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
            >
              Перейти к оформлению
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}