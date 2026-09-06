"use client";

import { useState } from "react";
import Link from "next/link";
import reviewsData from "../data/reviews.json";
import Reveal from "./Reveal";

export const REVIEW_TABS = ["О результатах", "О продукции", "О магазине"];

function Stars() {
  return (
    <span role="img" className="flex gap-0.5 text-honeyDark" aria-label="Оценка 5 из 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.8l2.5 5 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8 2.5-5Z" />
        </svg>
      ))}
    </span>
  );
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

function tabOf(review) {
  const topic = String(review.topic || "");
  if (topic.includes("продукц")) return "О продукции";
  if (topic.includes("магазин")) return "О магазине";
  return "О результатах";
}

function ReviewCard({ review, wide = false }) {
  const yandex = review.url || reviewsData.meta?.yandexUrl;
  const text = String(review.text || "");
  const shown = wide ? text : text.slice(0, 430) + (text.length > 430 ? "…" : "");
  return (
    <figure
      className={`flex h-full flex-col rounded-3xl border border-line bg-paper p-6 shadow-card ${
        wide ? "sm:p-7" : ""
      }`}
    >
      <figcaption className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sageSoft/70 font-display text-[17px] font-semibold text-leafDark ring-1 ring-leaf/20"
          >
            {initials(review.author)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[16px] font-extrabold leading-tight text-ink">{review.author}</p>
            <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-wider text-secondary">
              {review.topic || "отзыв"}
              {formatDate(review.date) ? ` · ${formatDate(review.date)}` : ""}
            </p>
          </div>
        </div>
        <Stars />
      </figcaption>
      <blockquote className="mt-4 flex-1">
        <p className={`whitespace-pre-line leading-relaxed text-ink ${wide ? "text-[16px]" : "text-[15px]"}`}>{shown}</p>
      </blockquote>
      <a
        href={yandex}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leafDark transition hover:text-ink"
      >
        Читать на Яндекс.Картах →
      </a>
    </figure>
  );
}

export function ReviewsBoard({ wide = false }) {
  const list = reviewsData.reviews || [];
  const [tab, setTab] = useState(REVIEW_TABS[0]);
  const byTab = REVIEW_TABS.map((label) => ({
    label,
    items: list.filter((review) => tabOf(review) === label),
  }));

  return (
    <div data-testid="reviews-tabs">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Отзывы по темам">
        {byTab.map(({ label, items }) => {
          const active = tab === label;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(label)}
              className={`rounded-full border px-4 py-2 text-[14px] font-bold transition ${
                active
                  ? "border-leaf bg-leaf text-paper shadow-card"
                  : "border-line bg-cream text-ink/90 hover:border-leaf/60 hover:text-leafDark"
              }`}
            >
              {label} · {items.length}
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="tabpanel" aria-label={tab}>
        {byTab
          .find((group) => group.label === tab)
          ?.items.map((review, i) => (
            <Reveal key={review.author + tab + i} delay={i * 60} className="h-full min-w-0">
              <ReviewCard review={review} wide={wide} />
            </Reveal>
          ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="border-t border-line/70 bg-cream/60 py-14 sm:py-16" aria-labelledby="reviews-title">
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">04 · отзывы</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="reviews-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Отзывы <span className="text-leaf">с Яндекс.Карт</span>
            </h2>
            <a
              href={reviewsData.meta?.yandexUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-paper px-5 py-2.5 text-[14px] font-bold text-ink/90 transition hover:border-leaf hover:text-leafDark"
            >
              Яндекс.Карты · оценка {reviewsData.meta?.rating || "5"} ★
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/90">
            Реальные отзывы покупателей о магазине «Фитотаб» на Яндекс.Картах — по темам:
            о результатах, о продукции и о сервисе.
          </p>
        </Reveal>

        <div className="mt-7">
          <ReviewsBoard />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/reviews/"
            className="rounded-full bg-leaf px-6 py-3 text-[15px] font-bold text-paper transition hover:bg-leafDark"
          >
            Все отзывы →
          </Link>
        </div>
      </div>
    </section>
  );
}