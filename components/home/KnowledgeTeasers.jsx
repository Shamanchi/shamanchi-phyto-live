import Link from "next/link";
import articles from "../../data/articles.json";
import Reveal from "../Reveal";

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

export default function KnowledgeTeasers() {
  const latest = [...articles]
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, 3);

  return (
    <section id="knowledge" className="py-14 sm:py-16" aria-labelledby="knowledge-title">
      <div className="wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">03 · знания врача</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="knowledge-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Статьи <span className="text-leaf">Евгения Козлова</span>
            </h2>
            <Link
              href="/knowledge/"
              className="rounded-full border border-line bg-cream px-5 py-2.5 text-[14px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
            >
              Все статьи →
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                <p className="font-mono text-[11px] uppercase tracking-wider text-khaki">
                  {formatDate(article.date)}
                </p>
                <h3 className="mt-3 font-display text-[22px] font-semibold leading-tight">
                  <Link href={`/knowledge/${article.slug}/`} className="transition hover:text-leaf">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-ink/90">
                  {String(article.text || "").replace(/\s+/g, " ").slice(0, 260)}…
                </p>
                <Link
                  href={`/knowledge/${article.slug}/`}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leaf transition hover:text-leafDark"
                >
                  Читать →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}