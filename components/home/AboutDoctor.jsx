import Link from "next/link";
import Reveal from "../Reveal";
import { asset, SHOP_TG_URL, SHOP_YT_CHANNEL, SHOP_YT_SUBSCRIBERS, SHOP_YT_URL } from "../../lib/site";

/**
 * Секция «Наши преимущества»: врач, регалии и преимущества магазина.
 * Слева — блок врача (фото как в hero, регалии, личная цитата, YouTube и Telegram).
 * Справа — шесть карточек преимуществ с фирменной двухцветной графикой.
 * Позиция: после квиза, перед отзывами.
 */

const G1 = "#207D44";
const G2 = "#78AA36";
const G3 = "#E8963A";
const PAPER_CARVE = "#FBF8F1";

const CARDS = [
  {
    name: "leaf",
    title: "Натуральное сырьё",
    text: "Только качественные товары, созданные природой и проверенные поколениями",
  },
  {
    name: "farm",
    title: "Своя грибная ферма",
    text: "Грибы с собственной фермы, травы и сырьё — из чистых регионов России",
  },
  {
    name: "dose",
    title: "Чистые составы",
    text: "Активные формы, понятные составы и высокие дозировки",
  },
  {
    name: "cert",
    title: "Сертификация и доставка",
    text: "Продукция сертифицирована (ГРН) и проходит тестирование; доставка по всей России",
  },
  {
    name: "dev",
    title: "Опыт разработки",
    text: "Профессиональная разработка препаратов — от рецептуры до выпуска",
  },
  {
    name: "eco",
    title: "Экологичное производство",
    text: "Производство в экологически чистых местах, вдали от городов",
  },
];

function AdvantageIcon({ name }) {
  const common = { viewBox: "0 0 64 64", className: "h-12 w-12", "aria-hidden": true };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M15 49c-1-9.6 3.2-18.6 13.2-23.4 4.8 9.6 1.4 19.6-7.2 24.8Z" fill={G2} />
        <path d="M33 6.5c9.6 1.4 16.4 7.8 16.4 17 0 9.8-6.8 17.6-16.4 21.6-9.4-4-16.4-11.8-16.4-21.6 0-9.2 6.8-15.6 16.4-17Z" fill={G1} />
        <path d="M33 13v24" stroke={G2} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M33 24.5c-3.9-1-7.2-2.9-9.5-6M33 24.5c3.9-1 7.2-2.9 9.5-6M33 32.5c-3 .6-5.8 2-8.2 4.4M33 32.5c3 .6 5.8 2 8.2 4.4" stroke={G2} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="47" cy="42" r="5.4" fill={G3} />
        <circle cx="45.6" cy="40.4" r="1.5" fill={PAPER_CARVE} />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg {...common}>
        <rect x="29" y="26" width="6" height="20" rx="3" fill={PAPER_CARVE} />
        <ellipse cx="32" cy="27" rx="11.5" ry="7.5" fill={G2} />
        <circle cx="26.5" cy="25" r="1.8" fill={G1} />
        <circle cx="33.5" cy="23.6" r="1.6" fill={G1} />
        <circle cx="38" cy="28" r="1.6" fill={G1} />
        <rect x="16" y="34" width="5" height="12" rx="2.5" fill={PAPER_CARVE} />
        <ellipse cx="18.5" cy="34.5" rx="7.4" ry="4.9" fill={G1} />
        <circle cx="15.5" cy="33" r="1.2" fill={PAPER_CARVE} />
        <rect x="43" y="34" width="5" height="12" rx="2.5" fill={PAPER_CARVE} />
        <ellipse cx="45.5" cy="34.5" rx="7.4" ry="4.9" fill={G1} />
        <circle cx="48.5" cy="33" r="1.2" fill={PAPER_CARVE} />
        <rect x="12" y="46" width="40" height="10" rx="5" fill={G1} />
        <rect x="12" y="46" width="40" height="3.5" rx="1.75" fill={G2} />
        <circle cx="32" cy="51" r="2.2" fill={G3} />
      </svg>
    );
  }
  if (name === "dose") {
    return (
      <svg {...common}>
        <rect x="13" y="25" width="22" height="17" rx="8.5" fill={G2} />
        <path d="M35 25h8a8.5 8.5 0 0 1 0 17h-8V25Z" fill={G1} />
        <path d="M18.5 29.6a8 8 0 0 1 5-2" stroke={PAPER_CARVE} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M50 17h5M52.5 14.5v5" stroke={G2} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M33 52c2.5 2.9 4.7 5.1 4.7 7 0 2.6-2.1 4.7-4.7 4.7s-4.7-2.1-4.7-4.7c0-1.9 2.2-4.1 4.7-7Z" fill={G3} />
      </svg>
    );
  }
  if (name === "cert") {
    return (
      <svg {...common}>
        <path d="M32 5.5 47 10.6v11.2c0 10.6-6.3 19-15 23.9-8.7-4.9-15-13.3-15-23.9V10.6L32 5.5Z" fill={G1} />
        <path d="M32 11.6 42.6 15.3v6.6c0 7.9-4.6 14.6-10.6 18.6-6-4-10.6-10.7-10.6-18.6v-6.6L32 11.6Z" fill="none" stroke={G2} strokeWidth="2.2" />
        <path d="m25.6 30.6 4.7 4.7 8.9-9.8" stroke={PAPER_CARVE} strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="45.5" cy="14" r="7.2" fill={G3} />
        <circle cx="45.5" cy="14" r="2.6" fill={PAPER_CARVE} />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg {...common}>
        <path d="M23.5 9.5h17v7.2L50.2 32c2.9 4.7-.8 11.2-6.7 11.2H20.5c-5.9 0-9.6-6.5-6.7-11.2l9.7-15.3v-7.2Z" fill={G1} />
        <path d="M22 38.8c.9-2.6 5.2-4.8 10-4.8s9.1 2.2 10 4.8c.6 1.7-.5 3.3-2.3 3.6l-15.4 0c-1.8-.3-2.9-1.9-2.3-3.6Z" fill={G2} />
        <circle cx="26" cy="38.5" r="1.5" fill={PAPER_CARVE} />
        <circle cx="32" cy="36.2" r="1.8" fill={PAPER_CARVE} />
        <circle cx="38" cy="38.8" r="1.4" fill={PAPER_CARVE} />
        <path d="M32 11.8v3" stroke={G3} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="49.5" cy="49.5" r="3.2" fill={G3} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M32 9.5 14.5 25H18v19h28V25h3.5L32 9.5Z" fill={G1} />
      <path d="M18 25 32 12.4 46 25" fill="none" stroke={G2} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27.5" y="30" width="9" height="14" rx="2.5" fill={PAPER_CARVE} />
      <circle cx="13" cy="11.5" r="4.6" fill={G3} />
      <path d="M13 2.8v3.6M13 16.6v3.6M3.4 11.5h3.6M19.4 11.5h3.6" stroke={G3} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19 48c-.7-4.4 1.3-8 4.7-9.8 1.4 5-.1 8.6-4.7 9.8Z" fill={G2} />
      <path d="M45 48c.7-4.4-1.3-8-4.7-9.8-1.4 5 .1 8.6 4.7 9.8Z" fill={G2} />
      <path d="M12 50.5h40" stroke={G1} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutDoctor() {
  return (
    <section
      id="doctor"
      data-testid="about-doctor"
      className="border-y border-line/70 bg-cream/60 py-14 sm:py-16"
      aria-labelledby="doctor-title"
    >
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">02 · преимущества</p>
          <h2 id="doctor-title" className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Евгений Козлов — <span className="text-leaf">врач за проектом</span>
          </h2>
          <p className="mt-4 max-w-3xl border-l-4 border-honey pl-4 text-[17px] font-medium leading-relaxed text-ink">
            Мы не являемся просто магазином — мы исследователи и производители. Поэтому на вопрос
            «почему у вас, а не в аптеке» отвечаем делами: своим сырьём, фермой и рецептурами.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          {/* Блок врача */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-lift">
              <img
                src={asset("/images/brand/doctor-hero.jpg")}
                alt="Евгений Козлов — фитотерапевт и клинический фармаколог"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-top"
              />
              <div className="p-5 sm:p-6">
                <p className="font-display text-xl font-semibold leading-snug text-ink">
                  Проект Евгения Козлова
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">
                  фитотерапевт, клинический фармаколог, доктор китайской медицины, нутрициолог, автор YouTube-канала
                  «{SHOP_YT_CHANNEL}»
                </p>
                <blockquote className="mt-4 rounded-2xl border-l-4 border-honey bg-cream px-4 py-3">
                  <p className="font-display text-[17px] font-semibold italic leading-snug text-ink">
                    «Моя главная задача — помочь вам сохранить здоровье и красоту на долгие годы,
                    сделав это легко и доступно!»
                  </p>
                </blockquote>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={SHOP_YT_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`YouTube-канал «${SHOP_YT_CHANNEL}»`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-[14px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-honey" fill="currentColor" aria-hidden="true">
                      <path d="M21.4 7.4a2.6 2.6 0 0 0-1.8-1.9C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.3A2.6 2.6 0 0 0 2.6 7.4 27 27 0 0 0 2.3 12c0 1.6.1 3.1.3 4.6a2.6 2.6 0 0 0 1.8 1.9c1.7.3 7.6.3 7.6.3s5.9 0 7.6-.3a2.6 2.6 0 0 0 1.8-1.9c.2-1.5.3-3 .3-4.6s-.1-3.1-.3-4.6ZM10.2 15.3V8.7l5.6 3.3-5.6 3.3Z" />
                    </svg>
                    YouTube · {SHOP_YT_SUBSCRIBERS} подписчиков
                  </a>
                  <a
                    href={SHOP_TG_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-[14px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-leaf" fill="none" aria-hidden="true">
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
            </div>
          </Reveal>

          {/* Шесть карточек преимуществ */}
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 60} className="h-full">
                <article className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:border-leaf/50 hover:shadow-lift">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sageSoft/60 ring-1 ring-leaf/20">
                    <AdvantageIcon name={card.name} />
                  </span>
                  <h3 className="font-display text-[19px] font-semibold leading-tight text-ink">{card.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-secondary">{card.text}</p>
                  <Link
                    href="/info/doctor/"
                    className="mt-auto inline-flex items-center gap-1.5 pt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-leafDark transition hover:text-ink"
                  >
                    Подробнее о проекте
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 8h9M8 4l4 4-4 4" />
                    </svg>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}