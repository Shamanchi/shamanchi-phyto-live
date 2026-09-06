import { readFileSync, writeFileSync } from "node:fs";
const srcRoot = process.argv[2] || "../reports/Phytotab/Воркер-3/Сбор Б — контент";
const base = new URL("https://phytotab.ru/");
function slugFromUrl(url) {
  try {
    const u = new URL(url, base);
    let seg = u.pathname.split("/").filter(Boolean).pop() || "article";
    seg = seg.replace(/-+/g, "-").replace(/^[\d-]+/, "");
    return seg.slice(0, 80) || "article";
  } catch {
    return "article";
  }
}
const articles = JSON.parse(readFileSync(srcRoot + "/articles.json", "utf8")).map((a) => ({
  slug: slugFromUrl(a.url),
  title: a.title,
  url: a.url,
  date: a.date,
  text: a.text,
  safetyNote: a["safety-note"] || "",
}));
writeFileSync("data/articles.json", JSON.stringify(articles, null, 2) + "\n", "utf8");

const reviewsRaw = JSON.parse(readFileSync(srcRoot + "/reviews.json", "utf8"));
const reviews = reviewsRaw.reviews.map((r) => ({
  author: r.author,
  date: r.date || null,
  topic: r.topic || "",
  text: r.text,
  url: r.url || reviewsRaw.meta?.yandex_org?.url || "",
  profileUrl: r.profile_url || "",
  confirmed: Boolean(r.confirmed_on_yandex_ssr),
}));
const reviewsData = {
  meta: {
    sourcePage: reviewsRaw.meta?.source_page || "https://phytotab.ru/otzyvy/",
    yandexUrl: reviewsRaw.meta?.yandex_org?.url || "https://yandex.ru/maps/org/fitotab/96461651681/reviews/",
    orgName: "Фитотаб",
    rating: "5",
  },
  reviews,
};
writeFileSync("data/reviews.json", JSON.stringify(reviewsData, null, 2) + "\n", "utf8");
console.log("articles:", articles.length, "| reviews:", reviews.length);
console.log("slugs:", articles.map((a) => a.slug).join(", "));