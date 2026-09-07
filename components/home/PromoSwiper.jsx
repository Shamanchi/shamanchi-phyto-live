"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { asset } from "../../lib/site";

const AUTOPLAY_MS = 6000;
const SLIDES = [
  {
    id: "doctor",
    kicker: "врач за проектом",
    title: "Фитосборы врача Евгения Козлова",
    text: "Практикующий врач-фитотерапевт проверяет каждую рецептуру. Живой человек за брендом: консультации, канал врача и продукция, которой он доверяет сам.",
    cta: { href: "/info/doctor/", label: "О создателе проекта" },
    cta2: { href: "/catalog/?category=fitosbory", label: "Каталог сборов" },
    img: asset("/images/brand/doctor-about.jpg"),
    imgAlt: "Евгений Козлов — врач-фитотерапевт, создатель PHYTOTAB",
    accent: "bg-leaf",
  },
  {
    id: "delivery",
    kicker: "доставка",
    title: "Бесплатная доставка от 7 900 ₽",
    text: "СДЭК по России — в большинство регионов без оплаты доставки при заказе от 7 900 ₽. Самовывоз в Москве — бесплатно в любой день.",
    cta: { href: "/info/delivery/", label: "Условия доставки" },
    cta2: null,
    img: null,
    imgAlt: "",
    accent: "bg-honey",
  },
  {
    id: "kletchatka",
    kicker: "скидка недели",
    title: "Клетчатка Козлова — 14%",
    text: "Любимая клетчатка врача со скидкой недели: поддержка пищеварения и мягкое очищение по системе Евгения Козлова.",
    cta: { href: "/product/kletchatka-kozlova-200-g/", label: "Смотреть товар" },
    cta2: { href: "/catalog/?collection=sale", label: "Все скидки" },
    img: asset("/images/products/product-51.jpg"),
    imgAlt: "Клетчатка Козлова, 200 г",
    accent: "bg-honeyDark",
  },
  {
    id: "news",
    kicker: "новинки",
    title: "Новинки PHYTOTAB",
    text: "Свежие поступления каталога: Мульти B-комплекс в спрее и обновлённая упаковка Клетчатки Козлова. Появляются первыми в витрине «Новинки».",
    cta: { href: "/catalog/?collection=news", label: "Смотреть новинки" },
    cta2: null,
    img: null,
    imgAlt: "",
    accent: "bg-leafDark",
  },
];

function SlideVisual({ slide }) {
  if (!slide.img) {
    return (
      <div className="hidden lg:flex items-center justify-center">
        {slide.id === "news" ? (
          <span className="grid h-44 w-44 place-items-center rounded-full bg-paper shadow-lift ring-1 ring-line/80">
            <img
              src={asset("/images/brand/logo-leaf.png")}
              alt=""
              width={120}
              height={120}
              loading="lazy"
              className="h-28 w-28 object-contain"
            />
          </span>
        ) : (
          <span className={`grid h-44 w-44 place-items-center rounded-full ${slide.accent} text-paper shadow-lift`}>
            <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              {slide.id === "delivery" ? (
                <> 
                  <rect x="2" y="6" width="11" height="9" rx="1.5" strokeWidth="1.6" />
                  <path d="M13 9H17.5L21 12.5V15H13Z" strokeWidth="1.6" strokeLinejoin="round" />
                  <circle cx="7" cy="17" r="1.8" fill="currentColor" stroke="none" />
                  <circle cx="16.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
                  <path d="M5 9L7 10.5L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <path d="M6 21 8 6l3 3 2.5-5 1.6 2.2L17 3l2.6 3.6M9 21l.7-8.6M13.6 20l1.3-6.2M17.6 18.4l1-4.2" />
              )}
            </svg>
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="hidden sm:block">
      <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
        <img
          src={slide.img}
          alt={slide.imgAlt}
          width={862}
          height={540}
          loading="lazy"
          className="aspect-[16/10] w-full max-w-[420px] object-cover"
        />
        {slide.id === "kletchatka" && (
          <span className="absolute right-3 top-3 rounded-full bg-honeyDark px-3 py-1 font-mono text-[12px] font-bold text-paper">
            −14%
          </span>
        )}
      </div>
    </div>
  );
}

export default function PromoSwiper() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = SLIDES.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      aria-label="Промо PHYTOTAB"
      className="relative py-8 sm:py-10"
      data-testid="promo-swiper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-line bg-cream shadow-card"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
            touchX.current = null;
          }}
        >
          <div
            data-testid="swiper-track"
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="слайд"
                aria-label={`${i + 1} из ${count}: ${slide.title}`}
                aria-hidden={i !== index}
                className="w-full shrink-0 px-6 py-10 sm:px-10 sm:py-12 lg:px-14"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className={i === index ? "" : "pointer-events-none"}>
                    <p className={`inline-flex rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${slide.accent === "bg-honey" ? "bg-honey text-ink" : slide.accent + " text-paper"}`}>
                      {slide.kicker}
                    </p>
                    <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[44px]">
                      {slide.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink/90 sm:text-[17px]">
                      {slide.text}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={slide.cta.href}
                        tabIndex={i === index ? 0 : -1}
                        className="inline-flex items-center gap-2 rounded-full bg-honey px-6 py-3 text-[15px] font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
                      >
                        {slide.cta.label}
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      {slide.cta2 && (
                        <Link
                          href={slide.cta2.href}
                          tabIndex={i === index ? 0 : -1}
                          className="rounded-full border-2 border-ink/15 px-6 py-2.5 text-[14px] font-bold text-ink transition hover:border-leaf hover:text-leaf"
                        >
                          {slide.cta2.label}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <SlideVisual slide={slide} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Стрелки */}
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий слайд"
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/90 text-ink/90 shadow-card transition hover:text-leaf"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12.5 4 6.5 10 12.5 16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Следующий слайд"
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/90 text-ink/90 shadow-card transition hover:text-leaf"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M7.5 4 13.5 10 7.5 16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Точки */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-0.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Перейти к слайду ${i + 1}: ${slide.title}`}
                aria-current={i === index}
                className="grid h-6 w-6 place-items-center rounded-full"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-leaf" : "w-2 bg-ink/25 hover:bg-ink/45"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
