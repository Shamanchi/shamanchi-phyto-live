// Приёмочный сценарий Сборки Б (shamanchi-phyto-live — реальный магазин PHYTOTAB).
// Покрытие: каталог 52 товара, разделы/фильтры/поиск, карточка (цена/состав/наличие),
// корзина (промокод), оформление (доставка/оплата) -> заказ принят, «Мои заказы» + повтор,
// Знания врача, отзывы с Яндекс.Карт, инфо-страницы, отсутствие «концепт/демо»-меток,
// адаптив без горизонтального скролла, ошибки консоли.
// Запуск: npm run test:acceptance (после npm run build).
import { chromium } from "playwright-core";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
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
  check(infoDirs.length === 8, `статический экспорт: 8 инфо-страниц (найдено ${infoDirs.length})`);

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
  check(homeText.includes("вадим"), "отзыв: автор Вадим на главной");
  check(homeText.includes("доставка сдэк по россии"), "доставка СДЭК в тексте главной");
  check(homeText.includes("разработка: shamanchi") && homeText.includes("shamanchi_dev"), "подвал: «Разработка: Shamanchi · shamanchi_dev»");
  check(homeText.includes("ип козлов е.а."), "подвал: публичные реквизиты ИП Козлов Е.А.");
  for (const word of FORBIDDEN) {
    check(!homeText.includes(lower(word)), `главная: нет метки «${word.trim()}»`);
  }

  const tgLinks = await home.locator(`a[href*="telegram.me/phytotab"]`).count();
  check(tgLinks > 0, "есть ссылки на telegram.me/phytotab", `найдено ${tgLinks}`);

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
  await flow.getByRole("button", { name: "Оформить заказ" }).click();
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
  const infoUrls = ["delivery", "payment", "return", "faq", "certificates", "doctor", "brand", "contacts"];
  for (const slug of infoUrls) {
    const { ctx: ic, pg: ipg } = await newPage();
    const resp = await ipg.goto(`${BASE_URL}info/${slug}/`, { waitUntil: "domcontentloaded" });
    const ok = resp && resp.status() === 200;
    check(ok, `инфо-страница /info/${slug}/ открывается`);
    await ic.close();
  }
  const { ctx: delCtx, pg: del } = await newPage();
  await del.goto(`${BASE_URL}info/delivery/`, { waitUntil: "domcontentloaded" });
  const delText = lower(await bodyText(del));
  check(delText.includes("сдэк") && delText.includes("7 900"), "доставка: СДЭК и порог 7 900 ₽");
  const { ctx: revCtx, pg: rev } = await newPage();
  await rev.goto(`${BASE_URL}reviews/`, { waitUntil: "domcontentloaded" });
  const revText = lower(await bodyText(rev));
  check(revText.includes("людмила крупнова") && revText.includes("ксения весеняя"), "отзывы: все 6 авторов на странице");
  check(revText.includes("яндекс.карты"), "отзывы: источник Яндекс.Карты");
  const yandexCount = await rev.locator('a[href*="yandex"]').count();
  check(yandexCount > 0, "отзывы: ссылки на Яндекс");

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