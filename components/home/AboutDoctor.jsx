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
const PAPER_CARVE = "#F7F3EA";

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
  // Арт дизайнера, блоки 11–13 (ICON-33..38): преимущества в едином стиле
  // категорий — фирменный зелёный + светло-зелёный + янтарная деталь.
  const common = { viewBox: "0 0 64 64", className: "h-12 w-12 sm:h-14 sm:w-14", "aria-hidden": true };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M13 48C11 30 21 15 35 12C36 32 28 47 13 48Z" fill={G1} />
        <path d="M16 45C22 34 28 25 33 16" stroke={PAPER_CARVE} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M21 38Q26 37 29 33M25 30Q29 28 31 24" stroke={G2} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="47" cy="20" r="7" fill={G3} />
        <path d="M47 8V11M47 29V32M35 20H38M56 20H59M38.5 11.5L40.5 13.5M55.5 28.5L53.5 26.5M55.5 11.5L53.5 13.5" stroke={G3} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg {...common}>
        <circle cx="48" cy="15" r="6.5" fill={G3} />
        <path d="M48 4V7M48 23V26M37 15H40M56 15H59M40.2 7.2L42.3 9.3M55.8 22.8L53.7 20.7M55.8 7.2L53.7 9.3" stroke={G3} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M10 32C10 20 34 20 34 32Z" fill={G1} />
        <rect x="18" y="32" width="8" height="15" rx="4" fill={PAPER_CARVE} />
        <circle cx="17" cy="27" r="2.2" fill={PAPER_CARVE} />
        <circle cx="26" cy="25" r="1.8" fill={PAPER_CARVE} />
        <path d="M36 40C36 32 52 32 52 40Z" fill={G2} />
        <rect x="41" y="40" width="6" height="10" rx="3" fill={PAPER_CARVE} />
        <circle cx="42" cy="37" r="1.6" fill={PAPER_CARVE} />
      </svg>
    );
  }
  if (name === "dose") {
    return (
      <svg {...common}>
        <rect x="26" y="8" width="12" height="7" rx="2" fill={G3} />
        <rect x="23" y="15" width="18" height="36" rx="5" fill={G1} />
        <rect x="27" y="26" width="10" height="14" rx="2" fill={PAPER_CARVE} />
        <path d="M29 41V31M33 41V31" stroke={G2} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M47 24C49.5 28 51 30.5 51 33.5A6.5 6.5 0 1 1 38 33.5C38 30.5 44.5 28 47 24Z" fill={G2} />
        <path d="M44.5 35.5Q44.5 38 47 38" stroke={PAPER_CARVE} strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (name === "cert") {
    return (
      <svg {...common}>
        <path d="M32 7L52 15V31C52 44 44 52 32 56C20 52 12 44 12 31V15Z" fill={G1} />
        <path d="M23 32L29 38.5L42 25" stroke={PAPER_CARVE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M49 5L50.5 8.5L54 10L50.5 11.5L49 15L47.5 11.5L44 10L47.5 8.5Z" fill={G3} />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg {...common}>
        <path d="M25 9H39M27 9V24L17.5 45C16 49 19 52 23 52H41C45 52 48 49 46.5 45L37 24V9" stroke={G1} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M23.5 36H40.5L44 45.5C44.7 47.8 43.2 49 41 49H23C20.8 49 19.3 47.8 20 45.5Z" fill={G2} />
        <circle cx="30" cy="43" r="2.2" fill={PAPER_CARVE} />
        <circle cx="36" cy="46" r="1.6" fill={PAPER_CARVE} />
        <path d="M32 4C33 6 34.5 7.2 34.5 9A2.5 2.5 0 1 1 29.5 9C29.5 7.2 31 6 32 4Z" fill={G3} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="19" cy="17" r="7" fill={G3} />
      <path d="M4 50L20 26L30 41L38 30L60 50Z" fill={G1} />
      <path d="M38 30L46 40L38 44L30 41Z" fill={G2} />
      <path d="M20 26L25 34L20 36L15 34Z" fill={PAPER_CARVE} />
      <path d="M4 50H60" stroke={G2} strokeWidth="3" strokeLinecap="round" fill="none" />
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
                      <path fillRule="evenodd" clipRule="evenodd" d="M21.6 7.2C21.2 5.8 20.2 4.8 18.8 4.4C16.6 3.8 12 3.8 12 3.8C12 3.8 7.4 3.8 5.2 4.4C3.8 4.8 2.8 5.8 2.4 7.2C1.8 9.4 1.8 12 1.8 12C1.8 12 1.8 14.6 2.4 16.8C2.8 18.2 3.8 19.2 5.2 19.6C7.4 20.2 12 20.2 12 20.2C12 20.2 16.6 20.2 18.8 19.6C20.2 19.2 21.2 18.2 21.6 16.8C22.2 14.6 22.2 12 22.2 12C22.2 12 22.2 9.4 21.6 7.2ZM10 15L15.5 12L10 9Z" />
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
                      <path d="M21.5 3.5L2.8 10.9L9.6 13.4M21.5 3.5L14.9 20.8L9.6 13.4M21.5 3.5L9.6 13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M2.5 8h9.5M8.6 4.6l3.8 3.4-3.8 3.4" strokeLinecap="round" strokeLinejoin="round" />
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