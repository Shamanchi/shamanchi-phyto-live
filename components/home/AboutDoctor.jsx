import Link from "next/link";
import Reveal from "../Reveal";
import { SHOP_TG_URL } from "../../lib/site";

const FACTS = [
  ["12+ лет", "практики врача-фитотерапевта"],
  ["Алтай · Крым · Башкортостан", "регионы сбора трав для фитосборов"],
  ["Башкортостан", "собственная грибная ферма"],
];

export default function AboutDoctor() {
  return (
    <section id="doctor" className="border-y border-line/70 bg-cream/60 py-14 sm:py-16" aria-labelledby="doctor-title">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">01 · о враче</p>
            <h2 id="doctor-title" className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Евгений Козлов — <span className="text-leaf">врач за проектом</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <dl className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              {FACTS.map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-xl font-semibold text-leaf sm:text-2xl">{value}</dd>
                  <dd className="mt-1 text-[13px] leading-snug text-ink/55">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="space-y-4 text-[16px] leading-relaxed text-ink/80">
          <Reveal delay={60}>
            <p>
              Евгений — практикующий специалист в сфере естественного оздоровления: фитотерапевт,
              доктор китайской медицины, нутрициолог, висцеральный и гирудотерапевт. В работе
              с пациентами он опирается на классическое медицинское образование и интегративный
              подход — сочетание фитотерапии, традиционной китайской медицины, нутрициологии,
              висцеральной терапии, гирудотерапии, аюрведы и вакуумно-градиентного массажа.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p>
              Свой опыт Евгений вкладывает в продукцию PHYTOTAB: каждый товар проходит проверку
              под его руководством, рецептуры сборов и наборов опираются на традиционные знания
              о травах и грибах.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <blockquote className="rounded-2xl border-l-4 border-honey bg-paper/70 py-4 pl-5 pr-4">
              <p className="font-display text-lg font-semibold italic leading-snug text-ink/90">
                «О принципах здоровья рассказываю на канале «Твое здоровье», в онлайн-практикумах
                и телеграм-канале проекта».
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/knowledge/"
                className="rounded-full bg-leaf px-6 py-3 text-[15px] font-bold text-paper transition hover:bg-leafDark"
              >
                Знания врача →
              </Link>
              <a
                href={SHOP_TG_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line bg-paper px-6 py-3 text-[15px] font-bold text-ink/70 transition hover:border-leaf hover:text-leaf"
              >
                Написать в Telegram PHYTOTAB
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}