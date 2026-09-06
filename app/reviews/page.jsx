import Link from "next/link";
import reviewsData from "../../data/reviews.json";
import { ReviewsBoard } from "../../components/Reviews";

export const metadata = {
  title: "Отзывы покупателей — PHYTOTAB",
  description:
    "Реальные отзывы покупателей о магазине «Фитотаб» с Яндекс.Карт: о продукции, качестве и сервисе PHYTOTAB.",
};

export default function ReviewsPage() {
  return (
    <main id="main">
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-8 sm:py-12">
          <nav aria-label="Хлебные крошки" className="font-mono text-[12px] uppercase tracking-wider text-secondary">
            <Link href="/" className="transition hover:text-leafDark">Главная</Link>
            <span aria-hidden="true"> / Отзывы</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">04 · отзывы</p>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Отзывы <span className="text-leaf">с Яндекс.Карт</span>
              </h1>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">
                Реальные отзывы покупателей о магазине «Фитотаб» на Яндекс.Картах. Полная карточка
                организации: {reviewsData.meta?.orgName || "Фитотаб"} · оценка{" "}
                {reviewsData.meta?.rating || "5"} из 5.
              </p>
            </div>
            <a
              href={reviewsData.meta?.yandexUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[14px] font-bold text-ink shadow-card transition hover:border-leaf/60 hover:text-leafDark"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-honey text-[13px] font-extrabold text-ink" aria-hidden="true">★</span>
              Яндекс.Карты · оценка {reviewsData.meta?.rating || "5"} из 5
            </a>
          </div>

          <div className="mt-9">
            <ReviewsBoard wide />
          </div>
        </div>
      </div>
    </main>
  );
}