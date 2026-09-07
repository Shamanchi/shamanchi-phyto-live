import { SHOP_TG_URL } from "../../lib/site";

/** Карточка подписки на телеграм-канал врача: воронка удержания, не просто ссылка в подвале. */
export default function TgChannelCard({ compact = false, dark = false }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between ${
        dark ? "bg-leafDark text-paper" : "border border-sage/50 bg-sageSoft/40 text-ink"
      }`}
      data-testid="tg-channel-card"
    >
      <div className="flex items-start gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
          dark ? "bg-paper/15 text-paper" : "bg-leaf text-paper"
        }`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M21.9 4.6L3.4 11.7C2.7 12 2.7 13 3.5 13.3L8 14.7L9.7 20C10 20.8 11 21 11.6 20.4L14 18L18.6 21.5C19.3 22 20.3 21.7 20.5 20.8L23.4 6C23.6 5 22.8 4.3 21.9 4.6Z" />
      <path d="M7.5 13.8L20.5 6.6M10.5 17.5L12.6 15.4" stroke="#FBF8F1" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
        <div>
          <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
            dark ? "text-paper/70" : "text-leafDark"
          }`}>канал врача</p>
          <p className="mt-1 font-display text-xl font-semibold leading-tight sm:text-2xl">
            «Твоё здоровье» — телеграм Евгения Козлова
          </p>
          {!compact && (
            <p className={`mt-1.5 max-w-md text-[14.5px] leading-relaxed ${
              dark ? "text-paper/80" : "text-ink"
            }`}>
              Принципы здоровья, разборы сборов и ответы на вопросы подписчиков — без рекламы и лишнего шума.
            </p>
          )}
        </div>
      </div>
      <a
        href={SHOP_TG_URL}
        target="_blank"
        rel="noreferrer"
        className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-extrabold transition hover:-translate-y-0.5 ${
          dark
            ? "bg-honey text-ink shadow-card hover:bg-honeyDark"
            : "bg-leaf text-paper shadow-card hover:bg-leafDark"
        }`}
      >
        Подписаться
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
