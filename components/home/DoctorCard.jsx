"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { asset, SHOP_TG_URL, SHOP_YT_CHANNEL, SHOP_YT_SUBSCRIBERS, SHOP_YT_URL } from "../../lib/site";

/**
 * Живое фото врача справа от заголовка (2.1): оригинальный портрет Евгения Козлова
 * тёплая обработка под палитру, мягкое свечение и лёгкий параллакс.
 * Под фото — строка с YouTube-каналом и Telegram (правка 3, п. 8), вне снимка.
 */
export default function DoctorCard() {
  const wrapRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(Math.max(-14, Math.min(14, center * -0.045)));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="doctor-halo relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-cream shadow-lift">
        <div
          className="transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.045)` }}
        >
          <img
            src={asset("/images/brand/doctor-hero.jpg")}
            alt="Евгений Козлов — врач-фитотерапевт, основатель PHYTOTAB"
            width={900}
            height={1200}
            fetchPriority="high"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        {/* Тёплая обработка: янтарный тон + виньетка в палитру */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-honey/25 via-transparent to-leaf/10" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(34,48,31,0.22)]" aria-hidden="true" />
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-paper/95 px-3.5 py-3 shadow-card backdrop-blur sm:left-6 sm:right-auto sm:max-w-[300px]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream ring-1 ring-line/70">
            <img
              src={asset("/images/brand/logo-leaf.png")}
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="min-w-0">
            <p className="text-[15px] font-extrabold leading-tight text-ink">Евгений Козлов</p>
            <p className="mt-0.5 text-[13px] font-semibold leading-snug text-secondary">
              врач-фитотерапевт · основатель PHYTOTAB
            </p>
            <Link href="/info/doctor/" className="mt-1 inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-leafDark hover:text-ink">
              Биография →
            </Link>
          </span>
        </div>
      </div>

      {/* Креденшелы и соцконтакты под карточкой врача (не на фото) */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a
          href={SHOP_YT_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={`YouTube-канал «${SHOP_YT_CHANNEL}» — ${SHOP_YT_SUBSCRIBERS} подписчиков`}
          className="inline-flex min-w-0 items-center gap-2 rounded-full border border-line bg-paper/95 px-3.5 py-2 text-[13px] font-bold leading-tight text-ink shadow-card transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-honey" fill="currentColor" aria-hidden="true">
            <path d="M21.4 7.4a2.6 2.6 0 0 0-1.8-1.9C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.3A2.6 2.6 0 0 0 2.6 7.4 27 27 0 0 0 2.3 12c0 1.6.1 3.1.3 4.6a2.6 2.6 0 0 0 1.8 1.9c1.7.3 7.6.3 7.6.3s5.9 0 7.6-.3a2.6 2.6 0 0 0 1.8-1.9c.2-1.5.3-3 .3-4.6s-.1-3.1-.3-4.6ZM10.2 15.3V8.7l5.6 3.3-5.6 3.3Z" />
          </svg>
          <span className="truncate">
            Канал «{SHOP_YT_CHANNEL}» — {SHOP_YT_SUBSCRIBERS} подписчиков
          </span>
        </a>
        <a
          href={SHOP_TG_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram PHYTOTAB"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/95 px-3.5 py-2 text-[13px] font-bold leading-tight text-ink shadow-card transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-leaf" fill="none" aria-hidden="true">
            <path
              d="M20.9 4.6 3.2 11.3c-.9.4-.8 1.7.1 2l4.6 1.5 1.7 5.2c.2.8 1.2 1 1.8.3l2.3-2.7 4.6 3.3c.6.4 1.5.1 1.7-.7l3-14.5c.2-.9-.8-1.6-1.7-1.3l-.4.1Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M9 14.8 20.9 4.6M10.4 18.5l2.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Telegram PHYTOTAB
        </a>
      </div>
    </div>
  );
}