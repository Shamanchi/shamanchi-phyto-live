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
      <path
        d="M7.2 4.2l2.3.9c.6.2.9.8.8 1.4l-.5 2.2a1.1 1.1 0 0 1-.5.7L8.1 10.5a12.6 12.6 0 0 0 5.4 5.4l1.1-1.2a1.1 1.1 0 0 1 .7-.5l2.2-.5c.6-.1 1.2.2 1.4.8l.9 2.3c.2.6 0 1.3-.6 1.6l-1.7 1.1c-.5.3-1.1.4-1.6.2a16.3 16.3 0 0 1-11-11c-.2-.5-.1-1.1.2-1.6l1.1-1.7c.3-.6 1-.8 1.6-.6Z"
        stroke={LEAF}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="17.8" cy="5.6" r="1.3" stroke={HONEY} strokeWidth="1.4" />
      <path d="M14.8 4.6a3.6 3.6 0 0 1 4.4 3.9" stroke={HONEY} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  max: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 3.8a8.2 8.2 0 0 1 7.4 12.2L21 20l-4.2-1.4A8.2 8.2 0 1 1 12 3.8Z"
        stroke={LEAF}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 7.6 9.4 12h2.5l-1.5 4.4 4.2-4.9h-2.5l1.1-3.9Z"
        stroke={HONEY}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M20.9 4.6 3.2 11.3c-.9.4-.8 1.7.1 2l4.6 1.5 1.7 5.2c.2.8 1.2 1 1.8.3l2.3-2.7 4.6 3.3c.6.4 1.5.1 1.7-.7l3-14.5c.2-.9-.8-1.6-1.7-1.3l-.4.1Z"
        stroke={LEAF}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 14.8 20.9 4.6M10.4 18.5l2.5-3" stroke={HONEY} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 left-4 z-[70] sm:bottom-5 sm:left-5" data-testid="support-fab">
      <div className="relative">
        {open && (
          <div
            ref={cardRef}
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
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
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
              <path d="M12 3.4a8.7 8.7 0 0 1 8.7 8.7c0 2.7-1.2 5.1-3.1 6.7l-.5.5v2.8l-3.1-1.7a9 9 0 0 1-2 .3A8.7 8.7 0 0 1 12 3.4Z" />
              <path d="M9.7 9.7a2.5 2.5 0 0 1 4.9.6c0 1.3-1.6 2-1.6 3.3v.3" stroke="#E8963A" strokeWidth="1.9" strokeLinecap="round" fill="none" />
              <circle cx="13.1" cy="16.9" r="0.95" fill="#E8963A" stroke="none" />
            </>
          )}
          </svg>
          <span className="text-[15px] font-extrabold">Помощь</span>
        </button>
      </div>
    </div>
  );
}