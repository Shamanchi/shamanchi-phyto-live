"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useShop } from "../ShopContext";
import { asset, formatPrice } from "../../lib/site";
import { FORMAT_OPTIONS, FORMAT_LABELS, TASKS, TASK_LABELS, recommendProduct } from "../../lib/quiz";
import Reveal from "../Reveal";


const QG1 = "#207D44";
const QG2 = "#78AA36";
const QG3 = "#E8963A";
const QPAPER = "#F7F3EA";
const QINK = "#22301F";
const QICON = { viewBox: "0 0 40 40", className: "h-8 w-8", "aria-hidden": true };
const TASK_ICONS = {
  immunity: (
    <svg {...QICON}>
      <path d="M20 4L33 9V19C33 27 28 32 20 35C12 32 7 27 7 19V9Z" fill={QG1} />
      <rect x="17.6" y="12" width="4.8" height="15" rx="1.8" fill={QPAPER} />
      <rect x="12.5" y="17.2" width="15" height="4.8" rx="1.8" fill={QPAPER} />
      <circle cx="29.5" cy="7.5" r="2.6" fill={QG3} />
    </svg>
  ),
  gut: (
    <svg {...QICON}>
      <path d="M8 11H27C31.5 11 31.5 18 27 18H14C9.5 18 9.5 25 14 25H26C30.5 25 30.5 32 26 32H10" stroke={QG1} strokeWidth="3.6" strokeLinecap="round" fill="none" />
      <circle cx="33" cy="9" r="2.6" fill={QG3} />
      <circle cx="34" cy="30" r="2" fill={QG2} />
    </svg>
  ),
  sleep: (
    <svg {...QICON}>
      <path d="M24.5 5A15.5 15.5 0 1 0 34.5 28.5A12.5 12.5 0 0 1 24.5 5Z" fill={QG1} />
      <path d="M29 8L30.2 10.8L33 12L30.2 13.2L29 16L27.8 13.2L25 12L27.8 10.8Z" fill={QG3} />
      <circle cx="12" cy="10" r="1.8" fill={QG2} />
    </svg>
  ),
  skin: (
    <svg {...QICON}>
      <path d="M20 5 C27 5 32 11 32 19.5 C32 28.5 27 34.5 20 34.5 C13 34.5 8 28.5 8 19.5 C8 11 13 5 20 5 Z" fill={QG1} />
      <path d="M12.5 20 C12.5 14 15.2 10.8 20 10.8 C24.8 10.8 27.5 14 27.5 20 C27.5 27 24.8 30.5 20 30.5 C15.2 30.5 12.5 27 12.5 20 Z" fill={QPAPER} />
      <path d="M16.4 19.5 Q17.4 18.4 18.4 19.5 M21.6 19.5 Q22.6 18.4 23.6 19.5" stroke={QG1} strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <path d="M17.5 24 Q20 26.2 22.5 24" stroke={QG1} strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <path d="M32.5 7 L33.4 9.1 L35.5 10 L33.4 10.9 L32.5 13 L31.6 10.9 L29.5 10 L31.6 9.1 Z" fill={QG3} />
    </svg>
  ),
}
const FORMAT_ICONS = {
  "сбор": (
    <svg {...QICON}>
      <rect x="7" y="10" width="26" height="5" rx="2.2" fill={QG3} />
      <rect x="9" y="15" width="22" height="20" rx="3" fill={QG1} />
      <rect x="9" y="21" width="22" height="6" fill={QPAPER} />
      <path d="M13 24H17M21 24H25M28 24H29" stroke={QG2} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 7Q14 4.5 16 3M23 7Q22 4.5 24 3" stroke={QG2} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "капсулы": (
    <svg {...QICON}>
      <g transform="rotate(-28 13 15)">
        <rect x="4" y="10" width="19" height="9" rx="4.5" fill={QG1} />
        <path d="M13.5 10V19" stroke={QPAPER} strokeWidth="1.8" />
      </g>
      <g transform="rotate(24 27 24)">
        <rect x="18" y="20" width="19" height="9" rx="4.5" fill={QG3} />
        <path d="M27.5 20V29" stroke={QPAPER} strokeWidth="1.8" />
      </g>
      <circle cx="33" cy="9" r="2.4" fill={QG2} />
    </svg>
  ),
  "порошок": (
    <svg {...QICON}>
      <rect x="10" y="8" width="20" height="5" rx="2.2" fill={QG3} />
      <rect x="12" y="13" width="16" height="22" rx="3" fill={QG1} />
      <path d="M20 18L21.2 20.8L24 22L21.2 23.2L20 26L18.8 23.2L16 22L18.8 20.8Z" fill={QPAPER} />
      <rect x="27" y="27" width="8" height="2.6" rx="1.3" fill={QG2} />
      <rect x="29.7" y="24.3" width="2.6" height="8" rx="1.3" fill={QG2} />
    </svg>
  ),
  "набор": (
    <svg {...QICON}>
      <rect x="7" y="17" width="26" height="18" rx="2.5" fill={QG1} />
      <rect x="5" y="12" width="30" height="6.5" rx="2.2" fill={QG2} />
      <rect x="18" y="12" width="4.5" height="23" fill={QPAPER} />
      <path d="M20.2 12C15 12 14 5.5 18 5.5C21 5.5 20.5 9 20.2 12Z" fill={QG3} />
      <path d="M20.2 12C25.5 12 26.5 5.5 22.5 5.5C19.5 5.5 20 9 20.2 12Z" fill={QG3} />
    </svg>
  ),
}

const QUIZ_KEY = "pt-quiz-v1";

function OptionButton({ active, onClick, children, hint, name, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        active
          ? "border-leaf bg-sageSoft/50 shadow-card"
          : "border-line bg-cream hover:-translate-y-0.5 hover:border-sage hover:shadow-card"
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-3">
          {icon && (
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cream to-sageSoft/50 ring-1 ring-line/70 transition group-hover:ring-leaf/40">
              {icon}
            </span>
          )}
          <span className="min-w-0">
            <span className="block text-[16px] font-extrabold">{name}</span>
            {hint && <span className="mt-0.5 block text-[13px] text-secondary">{hint}</span>}
          </span>
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
            active ? "border-leaf bg-leaf text-paper" : "border-ink/25 bg-transparent"
          }`}
          aria-hidden="true"
        >
          {active && (
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8.4 6.4 11.8 13 4.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}

export default function QuizSection() {
  const { add } = useShop();
  const [step, setStep] = useState(0);
  const [taskKey, setTaskKey] = useState(null);
  const [formatKey, setFormatKey] = useState(null);
  const [meds, setMeds] = useState(false);
  const [done, setDone] = useState(false);
  const [contact, setContact] = useState("");
  const [leadDone, setLeadDone] = useState(false);
  const [added, setAdded] = useState(false);
  const resultRef = useRef(null);

  const recommended = useMemo(
    () => (taskKey ? recommendProduct(taskKey, formatKey) : null),
    [taskKey, formatKey]
  );

  const formatFallback = recommended && formatKey && recommended.formatKey !== formatKey;

  const pickTask = (key) => {
    setTaskKey(key);
    setStep(1);
  };
  const pickFormat = (key) => {
    setFormatKey(key);
    setStep(2);
  };
  const finish = () => {
    setDone(true);
    if (!recommended) return;
    try {
      localStorage.setItem(
        QUIZ_KEY,
        JSON.stringify({ productId: recommended.id, taskKey, formatKey, at: new Date().toISOString() })
      );
    } catch { /* localStorage может быть недоступен — подбор работает и без сохранения */ }
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  };
  const restart = () => {
    setStep(0);
    setTaskKey(null);
    setFormatKey(null);
    setMeds(false);
    setDone(false);
    setContact("");
    setLeadDone(false);
    setAdded(false);
  };

  const handleAdd = () => {
    if (!recommended) return;
    add(recommended.id, 1);
    setAdded(true);
  };

  const handleLead = (event) => {
    event.preventDefault();
    if (!contact.trim()) return;
    try {
      localStorage.setItem(
        QUIZ_KEY,
        JSON.stringify({
          productId: recommended?.id,
          taskKey,
          formatKey,
          lead: contact.trim(),
          at: new Date().toISOString(),
        })
      );
    } catch { /* форма сохраняется в браузере */ }
    setLeadDone(true);
  };

  const task = TASKS.find((t) => t.key === taskKey);
  const taskLabel = taskKey ? TASK_LABELS[taskKey] : "";
  const chosenFormatLabel = formatKey ? FORMAT_LABELS[formatKey] : "";
  const progress = step === 2 ? 100 : step === 0 ? 12 : 56;

  return (
    <section id="podbor" className="relative scroll-mt-28 border-y border-line/70 bg-cream/60 py-14 sm:py-16" aria-labelledby="quiz-title" data-testid="quiz-section">
      <div className="wrap">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">подбор по задаче</p>
            <h2 id="quiz-title" className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Какой товар <span className="text-leaf">подойдёт вам?</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Три коротких вопроса — рекомендация из реального каталога PHYTOTAB, с кнопкой
              «в корзину» и планом приёма.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <div className="rounded-[2rem] border border-line glass-card p-6 shadow-card sm:p-8">
              {/* Прогресс */}
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-khaki">
                  {done ? "готово" : `шаг ${step + 1} из 3`}
                </p>
                <span className="text-[12px] font-bold text-secondary">
                  {step === 0 ? "задача" : step === 1 ? "формат приёма" : done ? "результат" : "противопоказания"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sageSoft">
                <div
                  className="progress-line h-full rounded-full bg-leaf"
                  style={{ "--fill": progress + "%" }}
                />
              </div>

              {!done && step === 0 && (
                <fieldset className="mt-7">
                  <legend className="font-display text-2xl font-semibold">Что хотите поддержать?</legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {TASKS.map((t) => (
                      <OptionButton key={t.key} icon={TASK_ICONS[t.key]} name={t.label} hint={t.hint} active={taskKey === t.key} onClick={() => pickTask(t.key)} />
                    ))}
                  </div>
                </fieldset>
              )}

              {!done && step === 1 && (
                <fieldset className="mt-7">
                  <legend className="font-display text-2xl font-semibold">Как удобнее принимать?</legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {FORMAT_OPTIONS.map((f) => (
                      <OptionButton key={f.key} icon={FORMAT_ICONS[f.key]} name={f.label} hint={f.hint} active={formatKey === f.key} onClick={() => pickFormat(f.key)} />
                    ))}
                  </div>
                </fieldset>
              )}

              {!done && step === 2 && (
                <div className="mt-7">
                  <p className="font-display text-2xl font-semibold">Проверьте противопоказания</p>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream p-4">
                    <input
                      type="checkbox"
                      checked={meds}
                      onChange={(e) => setMeds(e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-leaf"
                    />
                    <span className="text-[14.5px] leading-relaxed text-ink">
                      Принимаю лекарства, беременна или кормлю, есть хронические заболевания
                      или аллергия на травы
                    </span>
                  </label>
                  {meds && (
                    <p className="rise-in mt-3 rounded-2xl border border-honey/40 bg-honey/10 px-4 py-3 text-[13.5px] leading-relaxed text-honeyDark">
                      Отлично, что отметили: приём сборов при лекарствах и хронических состояниях
                      лучше согласовать с врачом. Подбор покажем, а точный состав подтвердит
                      специалист — написать ему можно в телеграм PHYTOTAB.
                    </p>
                  )}
                </div>
              )}

              {!done && (
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="rounded-full border border-line bg-cream px-5 py-2.5 text-[14px] font-bold text-secondary transition hover:border-leaf hover:text-leaf"
                    >
                      ← Назад
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 2 ? (
                    <span className="text-[13px] text-secondary">выберите вариант, чтобы продолжить</span>
                  ) : (
                    <button
                      type="button"
                      onClick={finish}
                      className="rounded-full bg-honey px-7 py-3 text-[15px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
                    >
                      Показать подбор
                    </button>
                  )}
                </div>
              )}

              {/* Результат */}
              {done && recommended && (
                <div className="mt-7" ref={resultRef}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-leaf">
                    {taskLabel} · формат «{chosenFormatLabel || recommended.format}»
                  </p>
                  <div className="mt-4 grid gap-5 rounded-3xl border border-line glass-cream p-5 sm:grid-cols-[180px_1fr]">
                    <Link href={`/product/${recommended.id}/`} className="overflow-hidden rounded-2xl">
                      <img
                        src={asset(recommended.img)}
                        alt={recommended.name}
                        width={360}
                        height={360}
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold leading-tight">
                        <Link href={`/product/${recommended.id}/`} className="transition hover:text-leaf">
                          {recommended.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">{recommended.tagline}</p>
                      <p className="mt-3 text-2xl font-extrabold text-honeyDark">{formatPrice(recommended.price)}</p>
                      {formatFallback && (
                        <p className="mt-2 text-[13px] text-khaki">
                          Под эту задачу в каталоге лучший формат — «{FORMAT_LABELS[recommended.formatKey]}». Возьмём его?
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={handleAdd}
                          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition ${
                            added ? "bg-leaf text-paper" : "bg-honey text-ink hover:-translate-y-0.5 hover:bg-honeyDark"
                          }`}
                        >
                          {added ? (
                            <>
                              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M3 8.4 6.4 11.8 13 4.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Добавлено
                            </>
                          ) : (
                            `В корзину · ${formatPrice(recommended.price)}`
                          )}
                        </button>
                        {added && (
                          <Link
                            href="/cart/"
                            className="inline-flex items-center gap-1.5 rounded-full border-2 border-leaf px-5 py-2.5 text-[14px] font-bold text-leaf transition hover:bg-leaf hover:text-paper"
                          >
                            Перейти в корзину →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Мягкий сбор контакта для расчёта курса */}
                  <div className="mt-5 rounded-2xl border border-dashed border-sage/70 bg-sageSoft/25 p-5">
                    {!leadDone ? (
                      <form onSubmit={handleLead} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                          <label htmlFor="quiz-lead" className="text-[14px] font-extrabold">
                            Прислать подбор с расчётом курса на месяц?
                          </label>
                          <p className="mt-0.5 text-[13px] text-secondary">
                            Оставьте телеграм или телефон — пришлём схему приёма и напомним о курсе.
                          </p>
                          <input
                            id="quiz-lead"
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="@username или +7 …"
                            className="field mt-2"
                            autoComplete="off"
                          />
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-leaf bg-transparent px-6 py-3 text-[15px] font-bold text-leaf transition hover:bg-leaf hover:text-paper"
                        >
                          Получить расчёт
                        </button>
                      </form>
                    ) : (
                      <p className="rise-in flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf text-paper">
                          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M3 8.4 6.4 11.8 13 4.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-[14.5px] font-semibold leading-snug">
                          Заявка принята — пришлём подбор с расчётом курса.
                          <span className="mt-1 block text-[13px] font-normal text-secondary">
                            Подбор уже сохранён в корзине: нужный товар там подсвечен.
                          </span>
                        </span>
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={restart}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-khaki transition hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M2.5 8A5.5 5.5 0 1 0 8 2.5a5.8 5.8 0 0 0-4.4 1.7L2.5 5.3" strokeLinecap="round" />
                      <path d="M2.4 2.2v3.2h3.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Пройти подбор заново
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
