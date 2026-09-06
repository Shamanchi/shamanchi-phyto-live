"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { asset } from "../../lib/site";

/**
 * Живое фото врача справа от заголовка (2.1): оригинальный портрет Евгения Козлова
 * с phytotab.ru, тёплая обработка под палитру, мягкое свечение и лёгкий параллакс.
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
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-leaf/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-paper backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-honey" aria-hidden="true" />
          живой человек за брендом
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-paper/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-leafDark backdrop-blur">
          фото: phytotab.ru
        </span>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-paper/95 px-4 py-3 shadow-card backdrop-blur sm:left-8 sm:right-auto sm:max-w-[260px]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-paper">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 21c-4.5-2-7-5.6-7-9.6C5 6.7 8.5 4 12 3c3.5 1 7 3.7 7 8.4 0 4-2.5 7.6-7 9.6Z" />
              <path d="M12 21c0-6 1.5-11 5-15" />
              <path d="M12 21c0-6-1.5-11-5-15" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-extrabold leading-tight">Евгений Козлов</p>
            <p className="truncate text-[12px] text-ink/60">врач-фитотерапевт · основатель PHYTOTAB</p>
            <Link href="/info/doctor/" className="mt-0.5 inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-leaf hover:text-leafDark">
              Биография →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
