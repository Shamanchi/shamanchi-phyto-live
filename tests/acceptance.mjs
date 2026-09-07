// Приёмочный сценарий магазина PHYTOTAB (shamanchi-phyto-live).
// Покрытие: каталог 52 товара, разделы/фильтры/поиск, карточка (цена/состав/наличие),
// корзина (промокод), оформление (доставка/оплата) -> заказ принят, «Мои заказы» + повтор,
// Знания врача, отзывы с Яндекс.Карт, инфо-страницы, отсутствие «концепт/демо»-меток,
// адаптив без горизонтального скролла, ошибки консоли.
// Запуск: npm run test:acceptance (после npm run build).
import { chromium } from "playwright-core";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "../scripts/serve-static.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, "..");
const outDir = join(projectRoot, "out");
const artifacts = join(projectRoot, "tests", "artifacts", "build-b");
mkdirSync(artifacts, { recursive: true });

if (!existsSync(join(outDir, "index.html"))) {
  console.error("Нет ./out/index.html — сначала выполните npm run build");
  process.exit(1);
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("Chrome/Edge не найден. Укажите CHROME_PATH=... к исполняемому файлу браузера.");
  process.exit(1);
}

const checks = [];
const errors = [];
const consoleErrors = [];
function check(ok, name, detail = "") {
  checks.push({ ok, name, detail });
  if (!ok) errors.push(`${name}${detail ? " :: " + detail : ""}`);
}

const { server, port, base } = await startServer({ root: outDir, base: "/shamanchi-phyto-live", quiet: true });
const BASE_URL = `http://127.0.0.1:${port}${base}/`;

const FORBIDDEN = ["концепт", "демо-", "демо ", "Спутник", "вымышл", "Александр Ветров", "в разработке", "демо-заказ"];

async function bodyText(pg) {
  return (await pg.locator("body").innerText()).replace(/\u00a0/g, " ");
}
function norm(text) {
  return text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}
function lower(text) {
  return norm(text).toLowerCase();
}

const browser = await chromium.launch({ executablePath, headless: true, args: ["--no-sandbox"] });

try {
  // ===== Статические проверки экспорта =====
  const productDirs = readdirSync(join(outDir, "product"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(outDir, "product", d.name, "index.html")));
  check(productDirs.length === 52, `статический экспорт: 52 карточки товара (найдено ${productDirs.length})`);
  const knowledgeDirs = readdirSync(join(outDir, "knowledge"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(outDir, "knowledge", d.name, "index.html")));
  check(knowledgeDirs.length === 7, `статический экспорт: 7 статей «Знания врача» (найдено ${knowledgeDirs.length})`);
  const infoDirs = readdirSync(join(outDir, "info"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(outDir, "info", d.name, "index.html")));
  check(infoDirs.length === 15, `статический экспорт: 15 инфо-страниц (найдено ${infoDirs.length})`);

  // ===== Главная: бренд, врач, витрины, отзывы, подвал =====
  const { ctx: homeCtx, pg: home } = await newPage();
  async function newPage() {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await ctx.newPage();
    pg.on("pageerror", (e) => consoleErrors.push(String(e)));
    pg.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    return { ctx, pg };
  }
  await home.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await home.waitForSelector("h1", { timeout: 30000 });
  await home.evaluate(() => document.fonts.ready);

  const title = await home.title();
  check(lower(title).includes("phytotab") && lower(title).includes("фитосборы"), "title: PHYTOTAB + фитосборы", title);

  const h1 = norm(await home.locator("h1").innerText());
  check(h1.includes("Фитосборы врача") && h1.includes("Евгения Козлова"), "hero h1: «Фитосборы врача Евгения Козлова»", h1);

  const homeText = lower(await bodyText(home));
  check(homeText.includes("52 товара"), "герой: «52 товара в каталоге»");
  check(homeText.includes("подборки магазина"), "секция «Подборки магазина»");
  check(homeText.includes("евгений козлов — врач за проектом"), "секция «О враче»");
  check(homeText.includes("отзывы с яндекс.карт"), "блок отзывов с Яндекс.Карт");
  check(homeText.includes("людмила крупнова"), "отзывы: вкладка «О результатах» по умолчанию");
  check(homeText.includes("начните курс с первого сбора"), "главная: финальный CTA после отзывов");
  check(homeText.includes("что вас беспокоит?"), "главная: категории по задаче клиента");
  const heroTopText = lower(await home.locator("#top").innerText());
  check(!heroTopText.includes("живой человек за брендом") && !heroTopText.includes("фото: phytotab.ru"), "герой: на фото врача нет бейджей и подписей");
  check(homeText.includes("доставка сдэк по россии"), "доставка СДЭК в тексте главной");
  check(homeText.includes("разработка: shamanchi") && homeText.includes("shamanchi_dev"), "подвал: «Разработка: Shamanchi · shamanchi_dev»");
  check(homeText.includes("ип козлов е.а."), "подвал: публичные реквизиты ИП Козлов Е.А.");
  for (const word of FORBIDDEN) {
    check(!homeText.includes(lower(word)), `главная: нет метки «${word.trim()}»`);
  }

  const tgLinks = await home.locator(`a[href*="telegram.me/phytotab"]`).count();
  check(tgLinks > 0, "есть ссылки на telegram.me/phytotab", `найдено ${tgLinks}`);

  // Итерация 4: категории с иллюстрациями, вкладки отзывов, финальный CTA, порядок секций
  const catTiles = home.locator('[data-testid="category-tiles"] a[href*="/catalog/?category="]');
  check((await catTiles.count()) === 6, "главная: 6 категорий ведут в каталог с фильтром", "tiles " + (await catTiles.count()));
  const tabCount = await home.locator('[data-testid="reviews-tabs"] [role="tab"]').count();
  check(tabCount === 3, "отзывы: три вкладки по темам", "tabs " + tabCount);
  check((await home.locator("[data-testid=final-cta]").count()) === 1, "главная: финальный CTA-блок");
  const orderOk = await home.evaluate(() => {
    const y = (sel) => { const r = document.querySelector(sel)?.getBoundingClientRect(); return r ? r.top + window.scrollY : null; };
    const reviews = y("#reviews");
    const cta = y("#final-cta");
    const footer = y("footer");
    return reviews !== null && cta !== null && footer !== null && reviews < cta && cta < footer;
  });
  check(orderOk, "порядок секций: отзывы → финальный CTA → подвал");

  // канвас живого фона
  await home.waitForSelector('[data-live-pollen="canvas"]', { timeout: 15000 }).catch(() => check(false, "живой фон: канвас пыльцы"));
  await home.screenshot({ path: join(artifacts, "1-home-1440.png") });

  // ===== Каталог: счётчики, разделы, поиск =====
  const { ctx: catCtx, pg: cat } = await newPage();
  await cat.goto(`${BASE_URL}catalog/`, { waitUntil: "domcontentloaded" });
  await cat.waitForSelector("h1");
  const catText = lower(await bodyText(cat));
  check(catText.includes("52 товара в каталоге") || catText.includes("52 товаров в каталоге"), "каталог: 52 товара");
  check(catText.includes("фитосборы") && catText.includes("грибы"), "каталог: разделы витрины");
  // поиск
  await cat.fill('input[type="search"]', "коллаген");
  await cat.waitForTimeout(400);
  const found = norm(await cat.locator('p:has-text("Найдено:")').first().innerText());
  check(/Найдено:\s*[1-9]/.test(found), "поиск «коллаген» даёт результат", found);
  const cardNames = (await cat.locator("main article h3").allInnerTexts()).map((n) => lower(n));
  check(cardNames.some((n) => n.includes("коллаген говяжий")), "поиск: в выдаче «Коллаген говяжий»");
  // фильтр по разделу (фитосборы = 8)
  await cat.fill('input[type="search"]', "");
  await cat.getByRole("button", { name: /фитосборы · 8/i }).click();
  await cat.waitForTimeout(400);
  const foundCats = norm(await cat.locator('p:has-text("Найдено:")').first().innerText());
  check(/Найдено:\s*8/.test(foundCats), "раздел «Фитосборы»: 8 товаров", foundCats);
  check(foundCats.includes("в разделе"), "в выдаче указан раздел");
  await cat.waitForSelector('[data-testid="category-banner"]', { timeout: 10000 });
  const banner = cat.locator('[data-testid="category-banner"]');
  check((await banner.locator('img[alt*="Евгений Козлов"]').count()) === 1, "категория: баннер с фото врача");
  const bannerText = lower(await banner.innerText());
  check(bannerText.includes("фитосборы") && bannerText.includes("phytotab"), "категория: баннер с названием и брендом");
  await cat.screenshot({ path: join(artifacts, "2-catalog-filter-1440.png") });

  // ===== Карточка товара: цена, состав, наличие =====
  const { ctx: prodCtx, pg: prod } = await newPage();
  await prod.goto(`${BASE_URL}product/kollagen-s-vitaminom-s-160-g-2/`, { waitUntil: "domcontentloaded" });
  await prod.waitForSelector("h1");
  const prodText = lower(await bodyText(prod));
  check(prodText.includes("коллаген говяжий"), "карточка: название товара");
  check(/1\s*890/.test(prodText), "карточка: цена 1 890 ₽");
  check(prodText.includes("состав"), "карточка: блок «Состав»");
  check(prodText.includes("как принимать"), "карточка: блок «Как принимать»");
  check(prodText.includes("в наличии"), "карточка: статус «В наличии»");
  const addBtn = prod.getByRole("button", { name: /В корзину/i });
  check((await addBtn.count()) > 0, "карточка: кнопка «В корзину»");
  await prod.screenshot({ path: join(artifacts, "3-product-1440.png") });

  // Товар без остатка: клетчатка Козлова
  const { ctx: outCtx, pg: out } = await newPage();
  await out.goto(`${BASE_URL}product/kletchatka-kozlova-200-g/`, { waitUntil: "domcontentloaded" });
  await out.waitForSelector("h1");
  const outText = lower(await bodyText(out));
  check(outText.includes("нет в наличии"), "карточка без остатка: «Нет в наличии»");
  const outBtn = out.getByRole("button", { name: "Нет в наличии" });
  check((await outBtn.count()) > 0 && (await outBtn.isDisabled()), "карточка без остатка: кнопка недоступна");

  // ===== Полный флоу: каталог → корзина → оформление → заказ =====
  const { ctx: flowCtx, pg: flow } = await newPage();
  await flow.goto(`${BASE_URL}product/kollagen-s-vitaminom-s-160-g-2/`, { waitUntil: "domcontentloaded" });
  await flow.getByRole("button", { name: /В корзину/ }).first().click();
  await flow.getByRole("link", { name: /Перейти к оформлению/ }).click();
  await flow.waitForURL(/\/cart\//);
  await flow.waitForSelector('text=Корзина');
  const cartText = lower(await bodyText(flow));
  check(cartText.includes("коллаген говяжий") && /1\s*890/.test(cartText), "корзина: строка товара и цена");
  check(cartText.includes("сумма без доставки"), "корзина: итог без доставки");
  // промокод
  await flow.fill("#promo-input", "PHYTOTAB10");
  await flow.getByRole("button", { name: "Применить" }).click();
  await flow.waitForTimeout(300);
  const cartWithPromo = lower(await bodyText(flow));
  check(cartWithPromo.includes("скидка по промокоду") && cartWithPromo.includes("189"), "корзина: промокод 10% применён");
  await flow.screenshot({ path: join(artifacts, "4-cart-promo-1440.png") });

  await flow.getByRole("link", { name: /Перейти к оформлению/ }).click();
  await flow.waitForURL(/\/checkout\//);
  await flow.waitForSelector("h1");
  // Шаг 1 — контакты
  await flow.fill("#co-name", "Иван Тестов");
  await flow.fill("#co-phone", "+7 900 123-45-67");
  await flow.getByRole("button", { name: "Далее" }).click();
  // Шаг 2 — доставка (самовывоз — бесплатно)
  await flow.getByRole("button", { name: /Самовывоз в Москве/ }).click();
  const checkoutText = lower(await bodyText(flow));
  check(checkoutText.includes("бесплатно"), "оформление: самовывоз бесплатно");
  await flow.getByRole("button", { name: "Далее" }).click();
  // Шаг 3 — оплата
  const payText = lower(await bodyText(flow));
  check(payText.includes("банковской картой") && payText.includes("сбп"), "оформление: способы оплаты (карта/СБП)");
  check(payText.includes("договора-оферты") && payText.includes("персональных данных"), "оформление: согласие с офертой и политикой ПД");
  const orderBtn = flow.getByRole("button", { name: "Оформить заказ" });
  check(await orderBtn.isDisabled(), "оформление: «Оформить заказ» неактивна без чекбокса");
  await flow.getByRole("checkbox", { name: /Согласен с договором-офертой/ }).check();
  await orderBtn.click();
  await flow.waitForURL(/\/order-success\/?\?id=/);
  await flow.waitForSelector("h1");
  const successText = lower(await bodyText(flow));
  check(successText.includes("заказ принят"), "заказ: «Заказ принят»");
  check(successText.includes("менеджер подтвердит заказ и пришлёт ссылку на оплату"), "заказ: менеджер пришлёт ссылку на оплату");
  check(/номер заказа:\s*pt-\d+/.test(successText), "заказ: номер формата PT-…");
  check(/1\s*701/.test(successText), "заказ: сумма 1 701 ₽ со скидкой");
  await flow.screenshot({ path: join(artifacts, "5-order-success-1440.png") });

  // ===== Мои заказы: история и повтор (та же вкладка — общий localStorage) =====
  const acc = await flowCtx.newPage();
  await acc.goto(`${BASE_URL}account/`, { waitUntil: "domcontentloaded" });
  await acc.waitForSelector("h1");
  const accText = lower(await bodyText(acc));
  check(accText.includes("мои заказы") && /pt-\d+/.test(accText), "кабинет: заказ появился в истории");
  check(accText.includes("принят"), "кабинет: статус заказа");
  await acc.getByRole("button", { name: "Повторить заказ" }).first().click();
  await acc.waitForURL(/\/cart\//);
  const afterRepeat = lower(await bodyText(acc));
  check(afterRepeat.includes("коллаген говяжий"), "повтор заказа: товар снова в корзине");

  // ===== Знания врача + статья =====
  const { ctx: knowCtx, pg: know } = await newPage();
  await know.goto(`${BASE_URL}knowledge/`, { waitUntil: "domcontentloaded" });
  await know.waitForSelector("h1");
  const knowText = lower(await bodyText(know));
  check(knowText.includes("знания врача"), "статьи: заголовок «Знания врача»");
  check(knowText.includes("королевский гриб рейши"), "статьи: список содержит статьи");
  await know.getByRole("link", { name: /Королевский гриб рейши/ }).first().click();
  await know.waitForURL(/\/knowledge\/rejshi-dar-zdorovya\//);
  const artText = lower(await bodyText(know));
  check(artText.includes("рейши") && artText.includes("не является лекарственным средством"), "статья: текст и дисклеймер БАД");
  await know.screenshot({ path: join(artifacts, "6-article-1440.png") });

  // ===== Инфо-страницы =====
  const infoUrls = ["delivery", "payment", "return", "faq", "certificates", "doctor", "brand", "contacts", "stock", "partners", "privacy-policy", "offer", "pd-agree", "cookies", "newsletter-consent"];
  for (const slug of infoUrls) {
    const { ctx: ic, pg: ipg } = await newPage();
    const resp = await ipg.goto(`${BASE_URL}info/${slug}/`, { waitUntil: "domcontentloaded" });
    const ok = resp && resp.status() === 200;
    check(ok, `инфо-страница /info/${slug}/ открывается`);
    await ic.close();
  }
  // ===== Правка 3: юрдокументы в подвале, «О компании», обложки статей =====
  const { ctx: legalCtx, pg: legal } = await newPage();
  await legal.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await legal.waitForSelector("footer");
  const legalLinks = await legal.evaluate(() =>
    [...document.querySelectorAll("footer a[href*='/info/']")].map((a) => a.getAttribute("href"))
  );
  for (const slug of ["privacy-policy", "offer", "return", "pd-agree", "cookies", "newsletter-consent"]) {
    check(legalLinks.some((h) => h.includes("/info/" + slug + "/")), "подвал: юрдокумент /info/" + slug + "/ доступен");
  }
  check(legalLinks.some((h) => h.includes("/info/stock/")), "подвал: ссылка на акции и скидки");
  check(legalLinks.some((h) => h.includes("/info/partners/")), "подвал: ссылка на страницу «Партнёрам»");
  await legalCtx.close();

  const { ctx: brandCtx, pg: brand } = await newPage();
  await brand.goto(BASE_URL + "info/brand/", { waitUntil: "domcontentloaded" });
  const brandText = lower(await bodyText(brand));
  check(brandText.includes("jiva nature") && brandText.includes("12 лет"), "о компании: Jiva Nature и 12+ лет практики");
  check(brandText.includes("youtube") && brandText.includes("5 000+"), "о компании: видео-канал и статистика 5 000+ покупателей");
  const brandImgs = await brand.locator("main img").count();
  check(brandImgs >= 2, "о компании: фото из раздела «О магазине» на странице");
  await brandCtx.close();
  await brandCtx.close();

  const { ctx: docCtx, pg: doc } = await newPage();
  await doc.goto(BASE_URL + "info/doctor/", { waitUntil: "domcontentloaded" });
  const docText = lower(await bodyText(doc));
  check(docText.includes("о создателе проекта"), "о враче: страница переименована в «О создателе проекта»");
  check(docText.includes("как появилась идея создания проекта phytotab"), "о враче: секция «Как появилась идея…» на месте");
  check(docText.includes("висцеральная терапия") && docText.includes("аюрведа"), "о враче: методики из эталона на месте");
  const docImgs = await doc.locator("main img").count();
  check(docImgs >= 2, "о враче: портрет и фото в разделе опыта на месте");
  await doc.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await doc.evaluate(() => {
    [...document.querySelectorAll("main img")].forEach((im) => {
      if (!im.complete || im.naturalWidth === 0) {
        im.loading = "eager";
        im.src = im.getAttribute("src");
      }
    });
  });
  await doc.waitForFunction(() => [...document.querySelectorAll("main img")].every((im) => im.complete && im.naturalWidth > 0), null, { timeout: 10000 });
  check(true, "о враче: фото реально загружаются");
  await doc.screenshot({ path: join(artifacts, "info-doctor-1440.png"), fullPage: true });
  await docCtx.close();

  const { ctx: artCtx, pg: art } = await newPage();
  await art.goto(BASE_URL + "knowledge/", { waitUntil: "domcontentloaded" });
  await art.waitForSelector("main article img");
  const coverImgs = await art.locator("main article img").count();
  check(coverImgs === 7, "статьи: у всех 7 карточек есть обложки-изображения");
  await art.goto(BASE_URL + "knowledge/rejshi-dar-zdorovya/", { waitUntil: "domcontentloaded" });
  await art.waitForSelector("article img");
  const reishiImgs = await art.locator("article img").count();
  check(reishiImgs >= 3, "статья: обложка и фото внутри текста на месте");
  await art.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await art.waitForTimeout(900);
  const loaded = await art.evaluate(() => [...document.querySelectorAll("article img")].every((im) => im.complete && im.naturalWidth > 0));
  check(loaded, "статья: изображения реально загружаются");
  await artCtx.close();

    const { ctx: delCtx, pg: del } = await newPage();
  await del.goto(`${BASE_URL}info/delivery/`, { waitUntil: "domcontentloaded" });
  const delText = lower(await bodyText(del));
  check(delText.includes("сдэк") && delText.includes("7 900"), "доставка: СДЭК и порог 7 900 ₽");
  const { ctx: revCtx, pg: rev } = await newPage();
  await rev.goto(`${BASE_URL}reviews/`, { waitUntil: "domcontentloaded" });
  const revText = lower(await bodyText(rev));
  check(revText.includes("людмила крупнова"), "отзывы: вкладка «О результатах» по умолчанию");
  await rev.getByRole("tab", { name: /о продукции/i }).click();
  await rev.waitForSelector("text=Ксения Весеняя");
  check(lower(await bodyText(rev)).includes("ксения весеняя"), "отзывы: вкладка «О продукции» показывает отзывы");
  await rev.getByRole("tab", { name: /о магазине/i }).click();
  await rev.waitForSelector("text=Вадим");
  check(lower(await bodyText(rev)).includes("вадим"), "отзывы: вкладка «О магазине» показывает отзывы");
  check(revText.includes("яндекс.карты"), "отзывы: источник Яндекс.Карты");
  const yandexCount = await rev.locator('a[href*="yandex"]').count();
  check(yandexCount > 0, "отзывы: ссылки на Яндекс");
  const reviewsFile = JSON.parse(readFileSync(join(projectRoot, "data", "reviews.json"), "utf8"));
  const reviewsAll = reviewsFile.reviews || [];
  check(reviewsAll.length === 22, `отзывы: в data/reviews.json все 22 отзыва (найдено ${reviewsAll.length})`);
  const chipTexts = await rev.locator('[data-testid="reviews-tabs"] [role="tab"]').allInnerTexts();
  const chipsNorm = chipTexts.map((t) => t.replace(/\s+/g, " ").trim()).join(" | ");
  check(/О результатах · 10/.test(chipsNorm) && /О продукции · 6/.test(chipsNorm) && /О магазине · 6/.test(chipsNorm), "отзывы: счётчики вкладок 10/6/6 — все 22 на месте", chipsNorm);

  // ===== Итерация 2: фавикон-лист, шапка с плашкой, фото врача ===== 
  const { ctx: i2Ctx, pg: i2 } = await newPage();
  await i2.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await i2.waitForSelector("h1");
  await i2.evaluate(() => document.fonts.ready);
  const favResp = await i2.request.get(BASE_URL + "favicon.png");
  check(favResp.status() === 200, "фавикон: /favicon.png отдаётся (200)", "status " + favResp.status());
  const favBody = await favResp.body();
  check(favBody.length > 5000, "фавикон: это не пустой файл и не дефолтная иконка Next", "bytes " + favBody.length);
  const iconHref = await i2.locator('link[rel~="icon"]').first().getAttribute("href");
  check(String(iconHref || "").endsWith("favicon.png"), "фавикон: в head ссылка на /favicon.png", iconHref || "");
  const doctorImg = i2.locator('img[alt*="Евгений Козлов"]').first();
  check((await doctorImg.count()) > 0 && (await doctorImg.isVisible()), "герой: фото врача справа от заголовка");
  const heroAlt = await doctorImg.getAttribute("alt");
  check(String(heroAlt).includes("врач-фитотерапевт"), "герой: alt фото — врач-фитотерапевт");
  check((await i2.locator('header img[src*="/images/brand/logo-word.png"]').count()) === 1, "шапка: фирменный вордмарк PHYTOTAB");
  check((await i2.locator('header img[src*="/images/brand/logo-leaf.png"]').count()) === 1, "шапка: знак-лист PHYTOTAB");
  check((await i2.locator('footer img[src*="/images/brand/logo-word.png"]').count()) === 1, "подвал: фирменный вордмарк PHYTOTAB");
  const topbar = i2.locator("[data-testid=nav-topbar]");
  check(await topbar.isVisible(), "шапка: плашка поддержки видна (десктоп)");
  const topbarText = lower(await topbar.innerText());
  check(topbarText.includes("+7(909)984-05-06") && topbarText.includes("с 10 до 20 (мск)"), "шапка: телефон поддержки и часы работы");
  check(topbarText.includes("пункт самовывоза"), "шапка: пункт самовывоза");
  const mainNav = i2.locator('nav[aria-label="Основная навигация"]');
  for (const label of ["Каталог", "О нас", "Оплата", "Доставка", "Вопросы", "Статьи", "Контакты"]) {
    const link = mainNav.locator("a", { hasText: label }).first();
    check((await link.count()) > 0 && (await link.isVisible()), "шапка: пункт меню «" + label + "»");
  }
  check((await mainNav.locator("a", { hasText: "Подбор по задаче" }).count()) > 0, "шапка: вход в подбор из меню");
  check((await i2.getByRole("button", { name: "Открыть поиск" }).count()) === 1, "шапка: иконка поиска");
  check((await i2.getByRole("link", { name: /Личный кабинет/ }).count()) === 1, "шапка: иконка кабинета");
  check((await i2.getByRole("link", { name: /Избранное, товаров: 0/ }).count()) === 1, "шапка: иконка избранного с бейджем 0");
  check((await i2.getByRole("button", { name: /Корзина, товаров:/ }).count()) === 1, "шапка: иконка корзины");
  // Поиск из шапки ведёт в каталог с запросом
  await i2.getByRole("button", { name: "Открыть поиск" }).click();
  await i2.getByRole("searchbox", { name: "Поиск по каталогу" }).fill("грибы");
  await i2.getByRole("button", { name: "Найти" }).click();
  await i2.waitForURL(/\/catalog\/?\?q=/);
  await i2.waitForSelector('p:has-text("Найдено:")');
  const searchFound = norm(await i2.locator('p:has-text("Найдено:")').first().innerText());
  check(/Найдено:\s*[1-9]/.test(searchFound), "поиск из шапки: есть результаты", searchFound);
  // Каталог после поиска из шапки открывает фото врача на карточках? нет — возвращаемся на главную для слайдера
  await i2.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await i2.waitForSelector("h1");

  // ===== Итерация 2: промо-слайдер ===== 
  const swiper = i2.locator("[data-testid=promo-swiper]");
  check((await swiper.count()) === 1, "слайдер: секция на главной");
  const slideGroups = swiper.locator('[aria-roledescription="слайд"]');
  const slideCount = await slideGroups.count();
  check(slideCount === 4, "слайдер: 4 слайда", "count " + slideCount);
  const dotCount = await swiper.locator('button[aria-label^="Перейти к слайду"]').count();
  check(dotCount === 4, "слайдер: 4 точки переключения");
  const slide1Text = lower(await slideGroups.nth(0).innerText());
  check(slide1Text.includes("фитосборы врача евгения козлова"), "слайд 1: позиция врача без скидок");
  const slide2Text = lower(await slideGroups.nth(1).innerText());
  check(slide2Text.includes("бесплатная доставка от 7 900"), "слайд 2: реальное промо — доставка от 7 900 ₽");
  const slide3Text = lower(await slideGroups.nth(2).innerText());
  check(slide3Text.includes("клетчатка козлова") && slide3Text.includes("14%"), "слайд 3: реальное промо — клетчатка −14%");
  const slide4Text = lower(await slideGroups.nth(3).innerText());
  check(slide4Text.includes("новинки phytotab"), "слайд 4: новинки");
  await i2.getByRole("button", { name: "Следующий слайд" }).click();
  const trackTransform = await swiper.locator("[data-testid=swiper-track]").evaluate((el) => el.style.transform);
  check(String(trackTransform).includes("-100%"), "слайдер: переключение двигает ленту", trackTransform);
  await i2.screenshot({ path: join(artifacts, "i2-slider-1440.png") });

  // ===== Итерация 2: квиз → товар → корзина с подсветкой ===== 
  const { ctx: quizCtx, pg: quiz } = await newPage();
  await quiz.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await quiz.waitForSelector("h1");
  await quiz.locator("[data-testid=quiz-section]").scrollIntoViewIfNeeded();
  const quizCard = quiz.locator("[data-testid=quiz-section]");
  await quizCard.getByRole("button", { name: /Иммунитет/ }).click();
  await quizCard.getByRole("button", { name: /Фитосбор/ }).click();
  await quizCard.getByRole("button", { name: "Показать подбор" }).click();
  await quiz.waitForSelector("text=Крепкий иммунитет");
  const quizResultText = lower(await bodyText(quiz));
  check(quizResultText.includes("фитосбор №6. крепкий иммунитет"), "квиз: рекомендация из реального каталога");
  await quiz.screenshot({ path: join(artifacts, "i2-quiz-result-1440.png") });
  await quizCard.getByRole("button", { name: /В корзину/ }).click();
  await quiz.waitForSelector("text=Добавлено");
  await quiz.getByRole("link", { name: "Перейти в корзину" }).click();
  await quiz.waitForURL(/\/cart\//);
  await quiz.waitForSelector('li[data-quiz-recommended="true"]', { timeout: 15000 });
  const quizCartText = lower(await bodyText(quiz));
  check(quizCartText.includes("фитосбор №6") && quizCartText.includes("подобран в квизе"), "квиз: товар в корзине и подсвечен");
  check((await quiz.locator("[data-quiz-recommended=true]").count()) === 1, "квиз: у строки товара признак подсветки");
  await quiz.screenshot({ path: join(artifacts, "i2-quiz-cart-1440.png") });
  await quizCtx.close();

  // ===== Итерация 2: избранное ===== 
  const { ctx: favCtx, pg: fav } = await newPage();
  await fav.goto(BASE_URL + "catalog/", { waitUntil: "domcontentloaded" });
  await fav.waitForSelector("h1");
  const firstTileName = lower((await fav.locator("main article h3").first().innerText()).trim());
  await fav.getByRole("button", { name: /^Добавить в избранное:/ }).first().click();
  await fav.waitForSelector('a[aria-label="Избранное, товаров: 1"]');
  await fav.getByRole("link", { name: /Избранное, товаров: 1/ }).click();
  await fav.waitForURL(/\/favorites\//);
  const favText = lower(await bodyText(fav));
  check(favText.includes(firstTileName.slice(0, 24)), "избранное: сохранённый товар на странице");
  check((await fav.getByRole("button", { name: /^Убрать из избранного:/ }).count()) > 0, "избранное: сердце активно (можно убрать)");
  await fav.screenshot({ path: join(artifacts, "i2-favorites-1440.png") });
  await fav.getByRole("button", { name: /^Убрать из избранного:/ }).first().click();
  await fav.waitForSelector("text=Пока пусто");
  check(lower(await bodyText(fav)).includes("пока пусто"), "избранное: удаление работает, список пуст");
  await favCtx.close();

  // ===== Итерация 2: кнопка «Помощь» ===== 
  const { ctx: helpCtx, pg: help } = await newPage();
  await help.goto(BASE_URL + "catalog/", { waitUntil: "domcontentloaded" });
  await help.waitForSelector("h1");
  await help.getByRole("button", { name: "Открыть окно поддержки — Помощь" }).click();
  const helpDialog = help.getByRole("dialog", { name: "Помощь и поддержка PHYTOTAB" });
  await helpDialog.waitFor({ state: "visible" });
  const helpText = lower(await helpDialog.innerText());
  check(helpText.includes("позвонить") && helpText.includes("+7 (909) 984-05-06"), "помощь: карточка с телефоном");
  check((await helpDialog.locator('a[href*="max.ru"]').count()) === 1, "помощь: кнопка MAX");
  check((await helpDialog.locator('a[href*="telegram.me/phytotab"]').count()) === 1, "помощь: кнопка Telegram PHYTOTAB");
  await help.screenshot({ path: join(artifacts, "i2-help-1440.png") });
  await help.keyboard.press("Escape");
  check(!(await helpDialog.isVisible()), "помощь: закрывается по Esc");
  await helpCtx.close();

  // ===== Итерация 2: подписка на курс на карточке сбора ===== 
  const { ctx: crCtx, pg: cr } = await newPage();
  await cr.goto(BASE_URL + "product/fitosbor-krepkij-immunitet/", { waitUntil: "domcontentloaded" });
  await cr.waitForSelector("h1");
  const crBlock = cr.locator("[data-testid=course-reminder]");
  check((await crBlock.count()) === 1 && (await crBlock.isVisible()), "курс: блок «принимать курсом?» на карточке сбора");
  const crText = lower(await crBlock.innerText());
  check(crText.includes("напомнить о следующем курсе"), "курс: форма напоминания");
  await cr.getByRole("textbox", { name: "Телеграм или телефон для напоминания" }).fill("@test_doc");
  await crBlock.getByRole("button", { name: "Напомнить" }).click();
  await cr.waitForSelector("text=Заявка принята");
  await cr.screenshot({ path: join(artifacts, "i2-course-1440.png") });
  await crCtx.close();

  // ===== Итерация 2: телеграм-канал врача (футер + после заказа) ===== 
  await i2.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await i2.waitForSelector("h1");
  const tgCard = i2.locator("[data-testid=tg-channel-card]").first();
  check((await tgCard.count()) > 0, "телеграм: карточка подписки в футере");
  const tgCardText = lower(await tgCard.innerText());
  check(tgCardText.includes("телеграм евгения козлова") && tgCardText.includes("подписаться"), "телеграм: заголовок канала и CTA");
  const osPage = await i2Ctx.newPage();
  await osPage.goto(BASE_URL + "order-success/", { waitUntil: "domcontentloaded" });
  await osPage.waitForSelector("h1");
  const osText = lower(await bodyText(osPage));
  check(osText.includes("телеграм евгения козлова"), "телеграм: карточка канала после оформления заказа");
  await osPage.close();
  await i2Ctx.close();

  // ===== Итерация 2: скриншоты первого экрана и ключевых блоков (1440/768/360) ===== 
  for (const width of [1440, 768, 360]) {
    const { ctx: scCtx, pg: sc } = await newPage();
    await sc.setViewportSize({ width, height: 900 });
    await sc.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await sc.waitForSelector("h1");
    await sc.evaluate(() => window.scrollTo(0, 0));
    await sc.screenshot({ path: join(artifacts, "i2-home-top-" + width + ".png") });
    await sc.locator("[data-testid=promo-swiper]").scrollIntoViewIfNeeded();
    await sc.waitForTimeout(250);
    await sc.locator("[data-testid=promo-swiper]").screenshot({ path: join(artifacts, "i2-slider-" + width + ".png") });
    await sc.locator("[data-testid=quiz-section]").scrollIntoViewIfNeeded();
    await sc.waitForTimeout(600);
    await sc.locator("[data-testid=quiz-section]").screenshot({ path: join(artifacts, "i2-quiz-" + width + ".png") });
    await scCtx.close();
  }

  // ===== Адаптив: нет горизонтального скролла на 360/768 =====
  for (const width of [360, 768]) {
    const { ctx: mc, pg: mp } = await newPage();
    await mp.setViewportSize({ width, height: 800 });
    await mp.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await mp.waitForSelector("h1");
    await mp.evaluate(() => document.fonts.ready);
    const scroll = await mp.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    check(scroll <= 1, `главная: нет горизонтального скролла на ${width}px`, `scrollWidth+${scroll}`);
    await mp.goto(`${BASE_URL}catalog/`, { waitUntil: "domcontentloaded" });
    await mp.waitForSelector("h1");
    const scrollCat = await mp.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    check(scrollCat <= 1, `каталог: нет горизонтального скролла на ${width}px`, `scrollWidth+${scrollCat}`);
    await mp.screenshot({ path: join(artifacts, `7-mobile-${width}.png`) });
    await mc.close();
  }

  await homeCtx.close();
  await catCtx.close();
  await prodCtx.close();
  await outCtx.close();
  await flowCtx.close();
  await knowCtx.close();
  await delCtx.close();
  await revCtx.close();

  if (consoleErrors.length) {
    errors.push("ошибки консоли/страницы: " + consoleErrors.slice(0, 5).join(" | "));
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const pass = checks.filter((c) => c.ok).length;
const fail = checks.length - pass;
console.log(`\nРезультат: ${pass}/${checks.length} PASS`);
if (errors.length) {
  console.log("Провалы:");
  for (const e of errors) console.log("  ✗ " + e);
  process.exit(1);
} else {
  console.log("Все проверки пройдены.");
}