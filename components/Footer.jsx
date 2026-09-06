import Link from "next/link";
import { BRAND, DEV_MAIL, DEV_TG_HANDLE, DEV_TG_URL, ORBIT_URL, SHOP_EMAIL, SHOP_PHONE, SHOP_PHONE_HREF, SHOP_TG_URL, PICKUP_ADDRESS } from "../lib/site";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream/80">
      <div className="wrap py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${BRAND.name} — на главную`}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-paper">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M12 21c-4.5-2-7-5.6-7-9.6C5 6.7 8.5 4 12 3c3.5 1 7 3.7 7 8.4 0 4-2.5 7.6-7 9.6Z" />
                  <path d="M12 21c0-6 1.5-11 5-15M12 21c0-6-1.5-11-5-15" />
                </svg>
              </span>
              <span className="font-display text-[22px] font-semibold leading-none">
                {BRAND.wordmarkA} <span className="text-leaf">{BRAND.wordmarkB}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink/75">
              Магазин товаров здоровья врача-фитотерапевта Евгения Козлова: фитосборы, грибы,
              витамины и наборы по системе доктора.
            </p>
            <nav aria-label="О проекте" className="mt-4 space-y-2">
              {[
                ["/info/brand/", "О компании"],
                ["/info/doctor/", "О враче"],
                ["/info/certificates/", "Сертификаты"],
                ["/info/faq/", "Вопросы и ответы"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="block text-[14px] font-semibold text-ink/70 transition hover:text-leaf">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <nav aria-label="Покупателям">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">покупателям</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/catalog/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Каталог</Link></li>
              <li><Link href="/catalog/?collection=sale" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Скидки недели</Link></li>
              <li><Link href="/catalog/?collection=hits" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Хиты продаж</Link></li>
              <li><Link href="/catalog/?collection=news" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Новинки</Link></li>
              <li><Link href="/knowledge/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Знания врача</Link></li>
              <li><Link href="/reviews/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Отзывы</Link></li>
              <li><Link href="/account/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Мои заказы</Link></li>
            </ul>
          </nav>

          <nav aria-label="Сервис">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">сервис</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/info/delivery/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Доставка</Link></li>
              <li><Link href="/info/payment/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Оплата</Link></li>
              <li><Link href="/info/return/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Возврат и обмен</Link></li>
              <li><Link href="/info/contacts/" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">Контакты</Link></li>
              <li>
                <a href={SHOP_TG_URL} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-ink/75 transition hover:text-leaf">
                  Telegram PHYTOTAB
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">контакты</p>
            <ul className="mt-4 space-y-2.5 text-[15px] font-semibold">
              <li>
                <a href={SHOP_PHONE_HREF} className="text-ink/75 transition hover:text-leaf">{SHOP_PHONE}</a>
              </li>
              <li>
                <a href={`mailto:${SHOP_EMAIL}`} className="text-ink/75 transition hover:text-leaf">{SHOP_EMAIL}</a>
              </li>
              <li className="text-[13.5px] font-medium leading-relaxed text-ink/60">
                Пункт самовывоза: {PICKUP_ADDRESS}
                <br />
                ежедневно 11:00–19:00
              </li>
              <li className="text-[13.5px] font-medium leading-relaxed text-ink/60">
                Поддержка ежедневно 10:00–20:00 (МСК)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-2 border-t border-line pt-6 font-mono text-[11px] leading-relaxed text-ink/65">
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