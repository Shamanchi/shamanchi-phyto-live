import Link from "next/link";
import reviewsData from "../../data/reviews.json";

export const metadata = {
  title: "Отзывы покупателей — PHYTOTAB",
  description:
    "Реальные отзывы покупателей о магазине «Фитотаб» с Яндекс.Карт: о продукции, качестве и сервисе PHYTOTAB.",
};

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

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

export default function ReviewsPage() {
  const list = reviewsData.reviews || [];
  return (
    <main id="main">
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-8 sm:py-12">
          <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
            <Link href="/" className="transition hover:text-leaf">Главная</Link>
            <span aria-hidden="true"> / Отзывы</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">03 · отзывы</p>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Отзывы <span className="text-leaf">с Яндекс.Карт</span>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                Реальные отзывы покупателей о магазине «Фитотаб» на Яндекс.Картах. Полная карточка
                организации: {reviewsData.meta?.orgName || "Фитотаб"} · оценка{" "}
                {reviewsData.meta?.rating || "5"} из 5.
              </p>
            </div>
            <a
              href={reviewsData.meta?.yandexUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-leaf px-6 py-3 text-[15px] font-bold text-paper transition hover:bg-leafDark"
            >
              Все отзывы на Яндекс.Картах →
            </a>
          </div>

          <ul className="mt-10 space-y-6">
            {list.map((review) => (
              <li key={review.author} className="rounded-3xl border border-line bg-cream p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl font-semibold">{review.author}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-khaki">
                      {review.topic || "отзыв"} · {formatDate(review.date)} · Яндекс.Карты
                    </p>
                  </div>
                  <Stars />
                </div>
                <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.7] text-ink/80">{review.text}</p>
                <a
                  href={review.url || reviewsData.meta?.yandexUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leaf transition hover:text-leafDark"
                >
                  Читать на Яндекс.Картах →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}