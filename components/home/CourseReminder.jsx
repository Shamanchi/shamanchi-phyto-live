"use client";

import { useState } from "react";

const STORAGE_KEY = "pt-course-remind-v1";

/** «Принимать курсом?» — блок напоминания о следующем курсе на карточках фитосборов. */
export default function CourseReminder({ productName }) {
  const [contact, setContact] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const value = contact.trim();
    if (!value) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ product: productName, contact: value, at: new Date().toISOString() })
      );
    } catch { /* форма без бэкенда: сохраняем в браузере */ }
    setDone(true);
  };

  return (
    <section
      aria-labelledby="course-remind-title"
      className="rounded-3xl border border-dashed border-honey/60 bg-honey/10 p-6"
      data-testid="course-reminder"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-honeyDark">принимать курсом?</p>
          <h2 id="course-remind-title" className="mt-1.5 font-display text-2xl font-semibold leading-tight">
            Напомнить о следующем курсе
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink/70">
            Фитосборы чаще принимают курсом 30 дней. Оставьте телеграм или телефон — за несколько
            дней до окончания курса напомним и подскажем, нужен ли перерыв.
          </p>
        </div>
        {!done ? (
          <form onSubmit={submit} className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-end">
            <label className="flex-1 sm:w-64">
              <span className="sr-only">Телеграм или телефон</span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@username или +7 …"
                aria-label="Телеграм или телефон для напоминания"
                className="field"
                autoComplete="off"
              />
            </label>
            <button
              type="submit"
              className="shrink-0 rounded-full bg-leaf px-6 py-3 text-[14.5px] font-bold text-paper transition hover:bg-leafDark"
            >
              Напомнить
            </button>
          </form>
        ) : (
          <p className="rise-in flex items-start gap-2.5 rounded-2xl border border-sage/50 bg-sageSoft/40 px-4 py-3 text-[14px] font-semibold text-leafDark sm:max-w-xs">
            <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
            Заявка принята: напомним о следующем курсе и уточним перерыв.
          </p>
        )}
      </div>
    </section>
  );
}
