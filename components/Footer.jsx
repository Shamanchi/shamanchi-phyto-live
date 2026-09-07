import Link from "next/link";
import TgChannelCard from "./home/TgChannelCard";
import Logo from "./Logo";
import { BRAND, DEV_MAIL, DEV_TG_HANDLE, DEV_TG_URL, ORBIT_URL, SHOP_EMAIL, SHOP_PHONE, SHOP_PHONE_HREF, SHOP_TG_URL, SHOP_YT_CHANNEL, SHOP_YT_URL, PICKUP_ADDRESS } from "../lib/site";

const year = new Date().getFullYear();

const LEGAL_LINKS = [
  ["/info/privacy-policy/", "Политика обработки персональных данных"],
  ["/info/offer/", "Договор-оферта"],
  ["/info/return/", "Возврат и обмен"],
  ["/info/pd-agree/", "Согласие на обработку ПД"],
  ["/info/cookies/", "Политика cookies"],
  ["/info/newsletter-consent/", "Согласие на рассылку"],
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream/80">
      <div className="wrap py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-paper/70 py-1.5 pl-2 pr-4 ring-1 ring-line/80 transition hover:bg-paper"
              aria-label={`${BRAND.wordmarkA} ${BRAND.wordmarkB} — на главную`}
            >
              <Logo height={24} />
            </Link>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-ink/90">
              Магазин товаров здоровья врача-фитотерапевта Евгения Козлова: фитосборы, грибы,
              витамины и наборы по системе доктора.
            </p>
            <nav aria-label="О проекте" className="mt-4 space-y-2">
              {[
                ["/info/brand/", "О компании"],
                ["/info/doctor/", "О создателе проекта"],
                ["/info/certificates/", "Сертификаты"],
                ["/info/faq/", "Вопросы и ответы"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="block text-[14px] font-semibold text-ink/90 transition hover:text-leafDark">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <nav aria-label="Покупателям">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">покупателям</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/catalog/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Каталог</Link></li>
              <li><Link href="/info/stock/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Акции и скидки</Link></li>
              <li><Link href="/catalog/?collection=hits" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Хиты продаж</Link></li>
              <li><Link href="/catalog/?collection=news" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Новинки</Link></li>
              <li><Link href="/knowledge/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Знания врача</Link></li>
              <li><Link href="/reviews/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Отзывы</Link></li>
              <li><Link href="/account/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Мои заказы</Link></li>
            </ul>
          </nav>

          <nav aria-label="Сервис">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">сервис</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/info/delivery/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Доставка</Link></li>
              <li><Link href="/info/payment/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Оплата</Link></li>
              <li><Link href="/info/return/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Возврат и обмен</Link></li>
              <li><Link href="/info/contacts/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Контакты</Link></li>
              <li><Link href="/info/partners/" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">Партнёрам</Link></li>
              <li>
                <a href={SHOP_TG_URL} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-ink/90 transition hover:text-leafDark">
                  Telegram PHYTOTAB
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">контакты</p>
            <ul className="mt-4 space-y-2.5 text-[15px] font-semibold">
              <li>
                <a href={SHOP_PHONE_HREF} className="text-ink/90 transition hover:text-leafDark">{SHOP_PHONE}</a>
              </li>
              <li>
                <a href={`mailto:${SHOP_EMAIL}`} className="text-ink/90 transition hover:text-leafDark">{SHOP_EMAIL}</a>
              </li>
              <li className="text-[13.5px] font-medium leading-relaxed text-ink">
                Пункт самовывоза: {PICKUP_ADDRESS}
                <br />
                ежедневно 11:00–19:00
              </li>
              <li className="text-[13.5px] font-medium leading-relaxed text-ink">
                Поддержка ежедневно 10:00–20:00 (МСК)
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={SHOP_YT_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`YouTube-канал «${SHOP_YT_CHANNEL}»`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-[13px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-honey" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.6 7.2C21.2 5.8 20.2 4.8 18.8 4.4C16.6 3.8 12 3.8 12 3.8C12 3.8 7.4 3.8 5.2 4.4C3.8 4.8 2.8 5.8 2.4 7.2C1.8 9.4 1.8 12 1.8 12C1.8 12 1.8 14.6 2.4 16.8C2.8 18.2 3.8 19.2 5.2 19.6C7.4 20.2 12 20.2 12 20.2C12 20.2 16.6 20.2 18.8 19.6C20.2 19.2 21.2 18.2 21.6 16.8C22.2 14.6 22.2 12 22.2 12C22.2 12 22.2 9.4 21.6 7.2ZM10 15L15.5 12L10 9Z" />
                </svg>
                YouTube
              </a>
              <a
                href={SHOP_TG_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram PHYTOTAB"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-[13px] font-bold text-ink transition hover:-translate-y-0.5 hover:border-leaf/60 hover:text-leafDark"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-leaf" fill="none" aria-hidden="true">
                  <path d="M21.5 3.5L2.8 10.9L9.6 13.4M21.5 3.5L14.9 20.8L9.6 13.4M21.5 3.5L9.6 13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <TgChannelCard />
        </div>

        <nav aria-label="Юридические документы" className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">юридические документы</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-[13px] font-semibold text-ink/90 underline decoration-line underline-offset-2 transition hover:text-leafDark hover:decoration-leaf/60">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-2 border-t border-line pt-6 font-mono text-[11px] leading-relaxed text-ink">
          <p>
            БАД. Не является лекарственным средством. Перед применением проконсультируйтесь
            со специалистом.
          </p>
          <p>ИП Козлов Е.А. · ИНН 504712432604 · ОГРН 323508100428622</p>
          <p className="pt-1">
            © {year} {BRAND.name}. Разработка:{" "}
            <a href={ORBIT_URL} target="_blank" rel="noreferrer" className="underline decoration-leaf/50 underline-offset-2 transition hover:text-leaf">
              Shamanchi
            </a>
            {" · "}
            <a href={DEV_TG_URL} target="_blank" rel="noreferrer" className="underline decoration-leaf/50 underline-offset-2 transition hover:text-leaf">
              {DEV_TG_HANDLE}
            </a>
            {" · "}
            <a href={`mailto:${DEV_MAIL}`} className="underline decoration-leaf/50 underline-offset-2 transition hover:text-leaf">
              {DEV_MAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}