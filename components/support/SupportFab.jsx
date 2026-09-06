"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_SUPPORT_URL, SHOP_PHONE, SHOP_PHONE_HREF, SHOP_TG_URL, SUPPORT_HOURS } from "../../lib/site";

const CHANNELS = [
  {
    key: "phone",
    label: "Позвонить",
    note: SHOP_PHONE,
    href: SHOP_PHONE_HREF,
    external: false,
    icon: <path d="M6.6 3.5l2.4.9c.5.2.8.7.7 1.2l-.6 2.4a1 1 0 0 1-.4.6l-1.5 1.2a13 13 0 0 0 5.4 5.4l1.2-1.5a1 1 0 0 1 .6-.4l2.4-.6c.5-.1 1 .2 1.2.7l.9 2.4c.2.5 0 1.1-.5 1.4l-1.9 1.2c-.5.3-1.1.4-1.6.2a16.5 16.5 0 0 1-11-11c-.2-.6-.1-1.2.2-1.7l1.2-1.9c.3-.5.9-.7 1.4-.5Z" />,
  },
  {
    key: "max",
    label: "MAX",
    note: "чат с магазином",
    href: MAX_SUPPORT_URL,
    external: true,
    icon: <path d="M12 3a9 9 0 1 0 9 9l-1.5-.6A7.5 7.5 0 1 1 12 4.5c2 0 3.8.8 5.2 2l-2 2H21V4l-1.9 1.9A9.6 9.6 0 0 0 12 3Z" />,
  },
  {
    key: "telegram",
    label: "Telegram PHYTOTAB",
    note: "ответим в рабочее время",
    href: SHOP_TG_URL,
    external: true,
    icon: <path d="M21.5 4.5 2.8 11.7c-.8.3-.8 1.5.1 1.7l4.6 1.4 1.8 5.4c.2.7 1.1.9 1.6.3l2.4-2.7 4.7 3.5c.6.4 1.4.1 1.6-.7l3.2-15c.2-1-.7-1.8-1.7-1.5l-.6.1Zm-3.5 3-9 6.2-.1 3-1.1-3.4 10.2-5.8Z" />,
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
            className="rise-in absolute bottom-16 left-0 w-[290px] rounded-3xl border border-line bg-cream p-5 shadow-lift"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">служба поддержки</p>
            <p className="mt-1 font-display text-xl font-semibold leading-tight">
              Чем помочь?
            </p>
            <p className="mt-1 text-[12.5px] text-ink/55">
              Работаем ежедневно {SUPPORT_HOURS}
            </p>
            <ul className="mt-4 space-y-2.5">
              {CHANNELS.map((channel) => (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 transition hover:border-leaf hover:bg-sageSoft/30"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sageSoft text-leaf">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        {channel.icon}
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-extrabold leading-tight">{channel.label}</span>
                      <span className="block truncate text-[12px] text-ink/55">{channel.note}</span>
                    </span>
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
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M12 4a7.5 7.5 0 0 1 7.5 7.5c0 2.4-1 4.6-2.7 6L14 19v1.6a.4.4 0 0 1-.4.4H9.6a.4.4 0 0 1-.4-.4V19l-1-1.2a7.4 7.4 0 0 1-1.7-2.2l-.8.4a1 1 0 0 1-1.4-1l.5-1.7A7.5 7.5 0 0 1 12 4Z" />}
          </svg>
          <span className="text-[15px] font-extrabold">Помощь</span>
        </button>
      </div>
    </div>
  );
}
