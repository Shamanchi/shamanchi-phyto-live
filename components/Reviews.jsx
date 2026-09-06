import Link from "next/link";
import reviewsData from "../data/reviews.json";
import Reveal from "./Reveal";

function Stars() {
  return (
    <span className="flex gap-0.5 text-honeyDark" aria-label="Оценка 5 из 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.8l2.5 5 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8 2.5-5Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const list = reviewsData.reviews || [];
  return (
    <section id="reviews" className="border-t border-line/70 bg-cream/60 py-14 sm:py-16" aria-labelledby="reviews-title">
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">03 · отзывы</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="reviews-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Отзывы <span className="text-leaf">с Яндекс.Карт</span>
            </h2>
            <a
              href={reviewsData.meta?.yandexUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-paper px-5 py-2.5 text-[14px] font-bold text-ink/70 transition hover:border-leaf hover:text-leaf"
            >
              Яндекс.Карты · оценка {reviewsData.meta?.rating || "5"} ★
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/60">
            Реальные отзывы покупателей о магазине «Фитотаб» на Яндекс.Картах и странице
            отзывов phytotab.ru.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((review, i) => (
            <Reveal key={review.author + i} delay={i * 60} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper p-6 shadow-card">
                <figcaption className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold leading-tight">{review.author}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-khaki">
                      {review.topic || "отзыв"} · Яндекс.Карты
                    </p>
                  </div>
                  <Stars />
                </figcaption>
                <blockquote className="mt-4 flex-1">
                  <p className="whitespace-pre-line text-[14px] leading-relaxed text-ink/75">
                    {String(review.text).slice(0, 520)}
                    {String(review.text).length > 520 ? "…" : ""}
                  </p>
                </blockquote>
                <a
                  href={review.url || reviewsData.meta?.yandexUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-khaki transition hover:text-leaf"
                >
                  Читать на Яндекс.Картах →
                </a>
              </figure>
            </Reveal>
          ))}
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