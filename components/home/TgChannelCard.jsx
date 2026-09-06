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
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M21.5 4.5 2.8 11.7c-.8.3-.8 1.5.1 1.7l4.6 1.4 1.8 5.4c.2.7 1.1.9 1.6.3l2.4-2.7 4.7 3.5c.6.4 1.4.1 1.6-.7l3.2-15c.2-1-.7-1.8-1.7-1.5l-.6.1Zm-3.5 3-9 6.2-.1 3-1.1-3.4 10.2-5.8Z" />
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
            <p className={`mt-1.5 max-w-md text-[13.5px] leading-relaxed ${
              dark ? "text-paper/80" : "text-ink/80"
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
            ? "bg-honey text-ink shadow-card hover:bg-[#BB7B1E]"
            : "bg-leaf text-paper shadow-card hover:bg-leafDark"
        }`}
      >
        Подписаться
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 10h12m0 0-5-5m5 5-5 5" />
        </svg>
      </a>
    </div>
  );
}
