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
            <path fillRule="evenodd" clipRule="evenodd" d="M21.6 7.2C21.2 5.8 20.2 4.8 18.8 4.4C16.6 3.8 12 3.8 12 3.8C12 3.8 7.4 3.8 5.2 4.4C3.8 4.8 2.8 5.8 2.4 7.2C1.8 9.4 1.8 12 1.8 12C1.8 12 1.8 14.6 2.4 16.8C2.8 18.2 3.8 19.2 5.2 19.6C7.4 20.2 12 20.2 12 20.2C12 20.2 16.6 20.2 18.8 19.6C20.2 19.2 21.2 18.2 21.6 16.8C22.2 14.6 22.2 12 22.2 12C22.2 12 22.2 9.4 21.6 7.2ZM10 15L15.5 12L10 9Z" />
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
            <path d="M21.5 3.5L2.8 10.9L9.6 13.4M21.5 3.5L14.9 20.8L9.6 13.4M21.5 3.5L9.6 13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Telegram PHYTOTAB
        </a>
      </div>
    </div>
  );
}