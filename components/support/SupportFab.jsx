"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_SUPPORT_URL, SHOP_PHONE, SHOP_PHONE_HREF, SHOP_TG_URL, SUPPORT_HOURS } from "../../lib/site";

// Фирменные линейные иконки карточки «Помощь» (пункт 2.19 ТЗ):
// трубка / MAX / самолётик Telegram — единая тёплая линейная графика в 2 цвета палитры.
const LEAF = "#207D44";
const HONEY = "#E8963A";

const ICONS = {
    phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M6.6 3.6 C8 3.6 9.4 4.3 10.2 5.6 L11.4 7.8 C11.9 8.8 11.6 10 10.8 10.7 L9.7 11.7 C10.9 13.9 12.7 15.7 14.9 16.9 L15.9 15.8 C16.7 15 17.9 14.7 18.9 15.2 L21.2 16.4 C22.5 17.1 23.2 18.5 23.2 20 C23.2 21.2 22.2 22.2 21 22.2 C11.9 22.2 4.6 14.9 4.6 5.8 C4.6 4.6 5.4 3.6 6.6 3.6 Z" stroke={LEAF} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="17.8" cy="6.2" r="1.7" fill={HONEY} />
    </svg>
  ),
    max: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3.5 H19 A3.5 3.5 0 0 1 22.5 7 V11 A3.5 3.5 0 0 1 19 14.5 H10 L5.8 18.2 L6.9 14.5 H6.5 A3.5 3.5 0 0 1 3 11 V7 A3.5 3.5 0 0 1 6.5 3.5 Z" stroke={LEAF} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.2 11.5 V6.8 L10.6 10 L13 6.8 V11.5" stroke={LEAF} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16.8" cy="9" r="1.5" fill={HONEY} />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M21.5 3.5L9.8 13.3M21.5 3.5L15 20.8L9.8 13.3M21.5 3.5L3.2 10.4L9.8 13.3" stroke={LEAF} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.6 15.6L7.8 14.3M4.8 18.8L9.4 17.3" stroke={HONEY} strokeWidth="1.5" strokeLinecap="round" />    </svg>
  ),
};

const CHANNELS = [
  {
    key: "phone",
    label: "Позвонить",
    note: SHOP_PHONE,
    href: SHOP_PHONE_HREF,
    external: false,
  },
  {
    key: "max",
    label: "MAX",
    note: "чат с магазином",
    href: MAX_SUPPORT_URL,
    external: true,
  },
  {
    key: "telegram",
    label: "Telegram PHYTOTAB",
    note: "ответим в рабочее время",
    href: SHOP_TG_URL,
    external: true,
  },
];

export default function SupportFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event) => {
      // Клик по самой кнопке-триггеру обрабатывает onClick (свернуть/развернуть),
      // а не закрытие карточки как «клик вне её».
      if (toggleRef.current && toggleRef.current.contains(event.target)) return;
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-[70] sm:bottom-5 sm:left-5" data-testid="support-fab">
      <div className="relative">
        {open && (
          <div
            role="dialog"
            aria-label="Помощь и поддержка PHYTOTAB"
            className="rise-in absolute bottom-16 left-0 w-[300px] rounded-3xl border border-line bg-cream p-5 shadow-lift"
          >
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">служба поддержки</p>
            <p className="mt-1 font-display text-xl font-semibold leading-tight text-ink">Чем помочь?</p>
            <p className="mt-1 text-[14px] text-secondary">Работаем ежедневно {SUPPORT_HOURS}</p>
            <ul className="mt-4 space-y-2.5">
              {CHANNELS.map((channel) => (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 transition hover:-translate-y-0.5 hover:border-leaf/60 hover:shadow-card"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cream to-sageSoft/50 ring-1 ring-leaf/15">
                      {ICONS[channel.key]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-extrabold leading-tight text-ink">{channel.label}</span>
                      <span className="mt-0.5 block truncate text-[13px] font-semibold text-secondary">
                        {channel.note}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-leafDark"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M4.8 3L11.4 8L4.8 13" />
    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Закрыть окно поддержки" : "Открыть окно поддержки — Помощь"}
          className="flex items-center gap-2 rounded-full bg-leaf py-3 pl-4 pr-5 text-paper shadow-lift transition hover:-translate-y-0.5 hover:bg-leafDark"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <path d="M12 3.5H18A3.5 3.5 0 0 1 21.5 7V11A3.5 3.5 0 0 1 18 14.5H10.5L6.5 18L7.4 14.5H6.5A3.5 3.5 0 0 1 3 11V7A3.5 3.5 0 0 1 6.5 3.5Z" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9.6 9.2A2.4 2.4 0 1 1 12.4 11.3C12.4 12.3 11.6 12.7 11.6 13.6" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="11.7" cy="16" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="7" r="1.5" fill="currentColor" stroke="none" />            </>
          )}
          </svg>
          <span className="text-[15px] font-extrabold">Помощь</span>
        </button>
      </div>
    </div>
  );
}