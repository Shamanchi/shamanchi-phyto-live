import Link from "next/link";
import articles from "../../data/articles.json";

export const metadata = {
  title: "Знания врача — статьи Евгения Козлова",
  description:
    "Статьи врача-фитотерапевта Евгения Козлова: о травах, грибах, фитосборах и грамотном подходе к здоровью.",
};

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

export default function KnowledgePage() {
  const sorted = [...articles].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return (
    <main id="main">
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-8 sm:py-12">
          <nav aria-label="Хлебные крошки" className="font-mono text-[11px] uppercase tracking-wider text-khaki">
            <Link href="/" className="transition hover:text-leaf">Главная</Link>
            <span aria-hidden="true"> / Знания врача</span>
          </nav>
          <div className="mt-6 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-khaki">02 · знания врача</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Знания <span className="text-leaf">врача</span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
              Статьи проекта PHYTOTAB — о травах, грибах и разумном отношении к здоровью.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {sorted.map((article) => (
              <li key={article.slug}>
                <article className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-khaki">
                    {formatDate(article.date)}
                  </p>
                  <h2 className="mt-3 font-display text-[24px] font-semibold leading-tight">
                    <Link href={`/knowledge/${article.slug}/`} className="transition hover:text-leaf">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-ink/65">
                    {String(article.text || "").replace(/\s+/g, " ").slice(0, 300)}…
                  </p>
                  <Link
                    href={`/knowledge/${article.slug}/`}
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-leaf transition hover:text-leafDark"
                  >
                    Читать →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}