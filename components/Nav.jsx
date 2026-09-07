"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { asset, BRAND, SHOP_PHONE_HREF, SUPPORT_HOURS, SUPPORT_PHONE_RAW } from "../lib/site";
import { useShop } from "./ShopContext";
import Logo from "./Logo";

// Полное меню: Каталог, О нас, Оплата, Доставка, Вопросы, Статьи, Контакты.
const MENU_LINKS = [
  { href: "/catalog/", label: "Каталог" },
  { href: "/info/brand/", label: "О нас" },
  { href: "/info/payment/", label: "Оплата" },
  { href: "/info/delivery/", label: "Доставка" },
  { href: "/info/faq/", label: "Вопросы" },
  { href: "/knowledge/", label: "Статьи" },
  { href: "/info/contacts/", label: "Контакты" },
];

const MOBILE_EXTRA = [
  { href: "/#podbor", label: "Подбор по задаче" },
  { href: "/info/doctor/", label: "О создателе проекта" },
  { href: "/favorites/", label: "Избранное" },
  { href: "/account/", label: "Мои заказы" },
];


function PhoneGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.2 4.2l2.3.9c.6.2.9.8.8 1.4l-.5 2.2a1.1 1.1 0 0 1-.5.7L8.1 10.5a12.6 12.6 0 0 0 5.4 5.4l1.1-1.2a1.1 1.1 0 0 1 .7-.5l2.2-.5c.6-.1 1.2.2 1.4.8l.9 2.3c.2.6 0 1.3-.6 1.6l-1.7 1.1c-.5.3-1.1.4-1.6.2a16.3 16.3 0 0 1-11-11c-.2-.5-.1-1.1.2-1.6l1.1-1.7c.3-.6 1-.8 1.6-.6Z" />
      <path d="M14.9 4.3a3.8 3.8 0 0 1 4.9 4.3" stroke="#E8963A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18.2" cy="5.3" r="1.1" fill="#E8963A" stroke="none" />
    </svg>
  );
}
function PinGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.4S5.2 15.9 5.2 10.2a6.8 6.8 0 1 1 13.6 0c0 5.7-6.8 11.2-6.8 11.2Z" />
      <circle cx="12" cy="10.2" r="2.3" fill="#E8963A" stroke="none" />
    </svg>
  );
}
function SearchGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.9" cy="10.9" r="6.4" />
      <path d="m15.7 15.7 5 5" />
      <path d="M12.4 7c1.5.5 2.6 1.6 3 3.1" stroke="#78AA36" strokeWidth="1.5" />
      <path d="M6.9 13.4c.3-1.8 1.7-3.3 3.7-3.8" stroke="#E8963A" strokeWidth="1.5" />
    </svg>
  );
}
function UserGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.9" />
      <path d="M4.6 20.2a7.4 7.4 0 0 1 14.8 0" />
      <path d="M13.3 8.6c.5-.4.8-.9.9-1.5-.7 0-1.3.2-1.9.6l1 1.2-.8.9-.5-.6" stroke="#E8963A" strokeWidth="1.3" fill="#E8963A" />
    </svg>
  );
}
function HeartGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M12 10.6c1.2.6 2 1.6 2 2.8 0 1.2-.8 2.2-2 2.9-1.2-.7-2-1.7-2-2.9 0-1.2.8-2.2 2-2.8Z" fill="#E8963A" stroke="none" />
      <path d="M12 11.3v4.5" stroke="#FBF8F1" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}
function BagGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 7h12l1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H6.6a1.8 1.8 0 0 1-1.8-1.8L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
      <path d="M12 11.4c1.2.6 2 1.6 2 2.8s-.8 2.2-2 2.8-2-1.6-2-2.8.8-2.2 2-2.8Z" fill="#E8963A" stroke="none" />
      <path d="M12 12.1v4.4" stroke="#FBF8F1" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const { count, favoriteCount, setCartOpen } = useShop();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const page = pathname.replace(/\/+$/, "") || "/";
  const isHome = page === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (event) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/catalog/?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const solid = scrolled || menuOpen || searchOpen || !isHome;
  const headerClass = solid
    ? "border-b border-line/70 bg-paper/90 shadow-[0_8px_30px_-20px_rgba(34,48,31,.3)] backdrop-blur-md"
    : "bg-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${headerClass}`}>
      {/* Верхняя плашка: поддержка + самовывоз */}
      <div
        data-testid="nav-topbar"
        className="hidden bg-leafDark text-[#EDF3E4] lg:block"
      >
        <div className="wrap flex h-[38px] items-center justify-between gap-4 text-[13px]">
          <a href={SHOP_PHONE_HREF} className="flex items-center gap-2 font-semibold transition hover:text-white">
            <PhoneGlyph className="h-3.5 w-3.5" />
            Служба поддержки {SUPPORT_PHONE_RAW}, с 10 до 20 (МСК)
          </a>
          <div className="flex items-center gap-6">
            <Link href="/info/contacts/" className="flex items-center gap-1.5 font-semibold transition hover:text-white">
              <PinGlyph className="h-3.5 w-3.5" />
              Пункт самовывоза
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-16 items-center justify-between gap-2 sm:h-[72px] sm:gap-4">
        <Link
          href="/"
          aria-label={`${BRAND.wordmarkA} ${BRAND.wordmarkB} — на главную`}
          className="flex min-w-0 items-center rounded-full bg-paper/85 py-1 pl-1.5 pr-3 ring-1 ring-line/80 transition hover:bg-paper sm:pr-3.5"
        >
          <Logo height={22} wordClassName="hidden sm:block" />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-0.5 xl:flex">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-semibold text-ink/90 transition hover:bg-sageSoft/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#podbor"
            className="ml-1 whitespace-nowrap rounded-full bg-leaf px-3.5 py-2 text-[13px] font-bold text-paper transition hover:bg-leafDark"
          >
            Подбор по задаче
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Поиск */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Закрыть поиск" : "Открыть поиск"}
            className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <SearchGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </button>
          {/* Телефон — на мобильных плашка сворачивается в иконку */}
          <a
            href={SHOP_PHONE_HREF}
            aria-label="Позвонить в поддержку"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 xl:hidden sm:h-11 sm:w-11"
          >
            <PhoneGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </a>
          {/* Кабинет */}
          <Link
            href="/account/"
            aria-label="Личный кабинет — мои заказы"
            className="group hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <UserGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
          </Link>
          {/* Избранное */}
          <Link
            href="/favorites/"
            aria-label={`Избранное, товаров: ${favoriteCount}`}
            className="group relative hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <HeartGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
            {favoriteCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-extrabold text-paper">
                {favoriteCount}
              </span>
            )}
          </Link>
          {/* Корзина */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Корзина, товаров: ${count}`}
            className="group relative grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <BagGlyph className="h-[18px] w-[18px] text-leaf group-hover:text-leafDark" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-honey px-1 text-[11px] font-extrabold text-ink">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink xl:hidden sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Поисковая панель */}
      {searchOpen && (
        <div className="border-t border-line/60 bg-paper/95 px-5 py-4 backdrop-blur-md">
          <form onSubmit={submitSearch} className="wrap flex items-center gap-3" role="search" aria-label="Поиск по каталогу">
            <SearchGlyph className="h-5 w-5 shrink-0 text-leaf" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск: иммунитет, коллаген, грибы…"
              aria-label="Поиск по каталогу"
              className="w-full bg-transparent text-[16px] outline-none placeholder:text-ink/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-leaf px-5 py-2 text-[14px] font-bold text-paper transition hover:bg-leafDark"
            >
              Найти
            </button>
          </form>
        </div>
      )}

      {/* Мобильное меню (до xl) */}
      {menuOpen && (
        <nav aria-label="Мобильная навигация" className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-line/60 bg-paper/95 px-5 pb-5 pt-2 xl:hidden">
          <div className="wrap space-y-0.5">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[16px] font-semibold text-ink hover:bg-sageSoft/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            {MOBILE_EXTRA.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15.5px] font-bold text-leafDark hover:bg-sageSoft/50"
              >
                {link.href.startsWith("/favorites") && link.label === "Избранное" && favoriteCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-extrabold text-paper">
                    {favoriteCount}
                  </span>
                )}
                {link.label}
              </Link>
            ))}
            <div className="mt-3 rounded-2xl border border-line bg-cream px-4 py-3 text-[14px] leading-relaxed text-secondary">
              Служба поддержки{" "}
              <a href={SHOP_PHONE_HREF} className="font-extrabold text-leaf">
                {SUPPORT_PHONE_RAW}
              </a>
              , ежедневно {SUPPORT_HOURS}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
