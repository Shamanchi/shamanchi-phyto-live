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
  const common = { viewBox: "0 0 64 64", className: "h-12 w-12 sm:h-14 sm:w-14", "aria-hidden": true };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M36.5 4c11.8 1.8 19.2 9.8 19.2 21.2 0 12.2-8.4 21.8-19.2 26.7-10.8-4.9-19.2-14.5-19.2-26.7C17.3 13.8 24.7 5.8 36.5 4Z" fill={G1} />
        <path d="M36.5 13v27" stroke={G2} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M36.5 25.2c-4.3-1-7.9-3-10.7-6.3M36.5 25.2c4.3-1 7.9-3 10.7-6.3M36.5 33.8c-3.1.6-5.9 2.1-8.4 4.5M36.5 33.8c3.1.6 5.9 2.1 8.4 4.5" stroke={G2} strokeWidth="2.1" strokeLinecap="round" fill="none" />
        <path d="M11.5 43.5c.4-6.6 3.8-11.4 9.2-13.4.6 6.4-2.2 11.2-9.2 13.4Z" fill={G2} />
        <path d="M18.5 57.5c-.8-4.8 1.5-8.9 5.6-10.6.8 4.4-1.1 8-5.6 10.6Z" fill={G2} />
        <circle cx="54.5" cy="46.5" r="5.8" fill={G3} />
        <circle cx="52.9" cy="44.6" r="1.7" fill={PAPER_CARVE} />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg {...common}>
        <path d="M6 58c0-7.6 4.9-12 11.5-12h29C52.9 46 58 50.4 58 58Z" fill={G1} />
        <path d="M16.5 47c0-13 5.6-19.7 10.5-19.7S37.5 34 37.5 47Z" fill={G2} />
        <circle cx="25" cy="38.6" r="1.9" fill={PAPER_CARVE} />
        <circle cx="29.6" cy="34" r="1.5" fill={PAPER_CARVE} />
        <circle cx="31.2" cy="42.2" r="1.4" fill={PAPER_CARVE} />
        <path d="M37.5 47c0-5.4 2.7-8.8 4-8.8s4 3.4 4 8.8Z" fill={G1} />
        <circle cx="41.8" cy="42.6" r="1.3" fill={PAPER_CARVE} />
        <circle cx="13.5" cy="15" r="4.2" fill={G3} />
        <path d="M12.2 12.9a3.9 3.9 0 0 1 5.6 5.6" stroke={PAPER_CARVE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (name === "dose") {
    return (
      <svg {...common}>
        <rect x="28.4" y="12" width="7.2" height="8.4" rx="2.4" fill={G2} />
        <rect x="24.5" y="19" width="15" height="30" rx="7.5" fill={G1} />
        <path d="M28 26v21" stroke={PAPER_CARVE} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M32 29.5c3.6 3.5 5.6 6.5 5.6 9.3a5.6 5.6 0 1 1-11.2 0c0-2.8 2-6.2 5.6-9.3Z" fill={G3} />
        <path d="M32 31.6v5.6" stroke={PAPER_CARVE} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "cert") {
    return (
      <svg {...common}>
        <path d="M32 5 50 10.8V24c0 11.6-7 20.6-18 25.8C21 44.6 14 35.6 14 24V10.8L32 5Z" fill={G1} />
        <path d="M32 11.5 45.5 16v8c0 8.8-5.4 15.9-13.5 20-8.1-4.1-13.5-11.2-13.5-20v-8L32 11.5Z" fill="none" stroke={G2} strokeWidth="2" />
        <path d="m24.6 31.4 5.2 5.2 10-10.8" stroke={PAPER_CARVE} strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="50.5" cy="15" r="2.6" fill={G3} />
        <path d="M48.8 12.7a3.1 3.1 0 0 1 4.3 4.3" stroke={G3} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg {...common}>
        <rect x="28.4" y="5" width="7.2" height="5" rx="2" fill={G1} />
        <rect x="27" y="10.5" width="10" height="20" rx="3.5" fill={G2} />
        <circle cx="32" cy="43" r="13.5" fill={G2} />
        <path d="M19.1 47h25.8a12.9 12.9 0 0 1-25.8 0Z" fill={G1} />
        <circle cx="27.5" cy="50.5" r="1.5" fill={PAPER_CARVE} />
        <circle cx="33.5" cy="49.3" r="1.2" fill={PAPER_CARVE} />
        <circle cx="30.5" cy="53.5" r="1.1" fill={PAPER_CARVE} />
        <circle cx="52.5" cy="15.5" r="2.8" fill={G3} />
        <path d="M50.6 13.4a4 4 0 0 1 5.6 5.6" stroke={G3} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (name === "eco") {
    return (
      <svg {...common}>
        <circle cx="15.5" cy="16" r="5" fill={G3} />
        <path d="M14.1 13.6a4.3 4.3 0 0 1 6.1 6.1" stroke={PAPER_CARVE} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M14 58 40 9l21 30v19Z" fill={G2} />
        <path d="M40 9l-5.6 10.6h11.2L40 9Z" fill={PAPER_CARVE} />
        <path d="M0 58 25 28l11 12v18Z" fill={G1} />
        <path d="M30 40l-3.2 15h6.4L30 40Z" fill={G2} />
      </svg>
    );
  }
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