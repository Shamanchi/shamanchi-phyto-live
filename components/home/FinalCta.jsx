"use client";

import { useState } from "react";
import Link from "next/link";
import { SHOP_TG_URL } from "../../lib/site";
import Reveal from "../Reveal";

/**
 * Финальный CTA после отзывов (пункты 2.20/2.21 ТЗ): человек только что прочитал
 * отзывы — доверие на пике, его надо направить к действию, а не оставлять
 * наедине с подвалом. Подписка на курс + Telegram + каталог.
 */
export default function FinalCta() {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (contact.trim().length < 3) return;
    setSent(true);
  };

  return (
    <section
      id="final-cta"
      data-testid="final-cta"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden border-t border-line/70 bg-paper py-16 sm:py-20"
    >
      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-cream p-7 text-center shadow-card sm:p-10">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-secondary">курс доктора</p>
            <h2 id="final-cta-title" className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Начните курс <span className="text-leaf">с первого сбора</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink/90">
              Евгений Козлов составляет курсы из нескольких сборов: чтобы результат был заметнее,
              важно принимать их последовательно. Оставьте контакт — напомним, когда пора заказать
              следующий шаг курса.
            </p>

            {sent ? (
              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-leaf/30 bg-sageSoft/40 px-6 py-5" role="status">
                <p className="font-display text-2xl font-semibold text-ink">Заявка принята</p>
                <p className="mt-1 text-[15px] leading-relaxed text-secondary">
                  Спасибо! Напишем вам перед началом следующего курса и подскажем, с чего начать.
                </p>
              </div>
            ) : (
              <><form onSubmit={submit} className="mx-auto mt-7 max-w-md">
                <label htmlFor="final-cta-contact" className="sr-only">
                  Телеграм или телефон для напоминания о курсе
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="final-cta-contact"
                    type="text"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="@telegram или +7 900 000-00-00"
                    required
                    minLength={3}
                    className="field py-3.5 text-[16px]"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-leaf px-7 py-3.5 text-[16px] font-bold text-paper transition hover:bg-leafDark"
                  >
                    Напомнить о курсе
                  </button>
                </div>
              </form>
                <p className="mt-3 text-left text-[12px] leading-relaxed text-secondary">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link href="/info/privacy-policy/" className="underline decoration-leaf/40 underline-offset-2 transition hover:text-leafDark">
                    политикой обработки персональных данных
                  </Link>{" "}
                  и даёте согласие на{" "}
                  <Link href="/info/newsletter-consent/" className="underline decoration-leaf/40 underline-offset-2 transition hover:text-leafDark">
                    получение рассылки
                  </Link>.
                </p>
              </>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={SHOP_TG_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-leaf/25 bg-paper px-6 py-3 text-[15px] font-bold text-leafDark transition hover:border-leaf hover:bg-sageSoft/40"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M21.9 4.6L3.4 11.7C2.7 12 2.7 13 3.5 13.3L8 14.7L9.7 20C10 20.8 11 21 11.6 20.4L14 18L18.6 21.5C19.3 22 20.3 21.7 20.5 20.8L23.4 6C23.6 5 22.8 4.3 21.9 4.6Z" />
      <path d="M7.5 13.8L20.5 6.6M10.5 17.5L12.6 15.4" stroke="#FBF8F1" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Телеграм-канал врача
              </a>
              <Link
                href="/catalog/"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3 text-[16px] font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
              >
                Перейти в каталог
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}