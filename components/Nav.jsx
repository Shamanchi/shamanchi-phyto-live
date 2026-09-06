"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { asset, BRAND, SHOP_PHONE_HREF, SUPPORT_HOURS, SUPPORT_PHONE_RAW } from "../lib/site";
import { useShop } from "./ShopContext";

// Полное меню как на phytotab.ru: Каталог, О нас, Оплата, Доставка, Вопросы, Статьи, Контакты.
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
  { href: "/info/doctor/", label: "О враче" },
  { href: "/favorites/", label: "Избранное" },
  { href: "/account/", label: "Мои заказы" },
];

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
      {/* Верхняя плашка: поддержка + самовывоз (как на оригинале) */}
      <div
        data-testid="nav-topbar"
        className="hidden bg-leafDark text-[#EDF3E4] lg:block"
      >
        <div className="wrap flex h-[38px] items-center justify-between gap-4 text-[13px]">
          <a href={SHOP_PHONE_HREF} className="flex items-center gap-2 font-semibold transition hover:text-white">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6.6 3.5l2.4.9c.5.2.8.7.7 1.2l-.6 2.4a1 1 0 0 1-.4.6l-1.5 1.2a13 13 0 0 0 5.4 5.4l1.2-1.5a1 1 0 0 1 .6-.4l2.4-.6c.5-.1 1 .2 1.2.7l.9 2.4c.2.5 0 1.1-.5 1.4l-1.9 1.2c-.5.3-1.1.4-1.6.2a16.5 16.5 0 0 1-11-11c-.2-.6-.1-1.2.2-1.7l1.2-1.9c.3-.5.9-.7 1.4-.5Z" />
            </svg>
            Служба поддержки {SUPPORT_PHONE_RAW}, с 10 до 20 (МСК)
          </a>
          <div className="flex items-center gap-6">
            <Link href="/info/contacts/" className="flex items-center gap-1.5 font-semibold transition hover:text-white">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Zm0-7.4a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
              </svg>
              Пункт самовывоза
            </Link>
            <Link href="/#podbor" className="flex items-center gap-1.5 font-semibold transition hover:text-white">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M10 2.2a5 5 0 0 1 5 5c0 2.5-1.3 4-2.6 5.2-.9.9-1.9 1.8-1.9 3.1h-1c0-1.9 1.3-3.1 2.3-4.1 1.1-1.1 2.2-2.3 2.2-4.2a4 4 0 1 0-7.3 2.3l.9.8-1.4 1.4-.9-.8a6 6 0 0 1 4.7-9.7Z" />
                <circle cx="10" cy="17.6" r="1" fill="currentColor" />
              </svg>
              Подбор по задаче
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-16 items-center justify-between gap-2 sm:h-[72px] sm:gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${BRAND.wordmarkA} ${BRAND.wordmarkB} — на главную`}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf text-paper shadow-card">
            <img src={asset("/favicon.png")} alt="" width={36} height={36} className="h-8 w-8 rounded-full object-cover" />
          </span>
          <span className="truncate font-display text-[19px] font-semibold leading-none tracking-tight sm:text-[22px]">
            {BRAND.wordmarkA} <span className="text-leaf">{BRAND.wordmarkB}</span>
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-0.5 xl:flex">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-full px-3 py-2 text-[13.5px] font-semibold text-ink/80 transition hover:bg-sageSoft/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#podbor"
            className="ml-1 rounded-full bg-leaf px-3.5 py-2 text-[13px] font-bold text-paper transition hover:bg-leafDark"
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
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
          {/* Телефон — на мобильных плашка сворачивается в иконку */}
          <a
            href={SHOP_PHONE_HREF}
            aria-label="Позвонить в поддержку"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 xl:hidden sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6.6 3.5l2.4.9c.5.2.8.7.7 1.2l-.6 2.4a1 1 0 0 1-.4.6l-1.5 1.2a13 13 0 0 0 5.4 5.4l1.2-1.5a1 1 0 0 1 .6-.4l2.4-.6c.5-.1 1 .2 1.2.7l.9 2.4c.2.5 0 1.1-.5 1.4l-1.9 1.2c-.5.3-1.1.4-1.6.2a16.5 16.5 0 0 1-11-11c-.2-.6-.1-1.2.2-1.7l1.2-1.9c.3-.5.9-.7 1.4-.5Z" />
            </svg>
          </a>
          {/* Кабинет */}
          <Link
            href="/account/"
            aria-label="Личный кабинет — мои заказы"
            className="hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
            </svg>
          </Link>
          {/* Избранное */}
          <Link
            href="/favorites/"
            aria-label={`Избранное, товаров: ${favoriteCount}`}
            className="relative hidden h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 md:grid sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
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
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink transition hover:border-leaf/50 hover:bg-sageSoft/50 sm:h-11 sm:w-11"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 7h12l1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H6.6a1.8 1.8 0 0 1-1.8-1.8L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
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
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-ink xl:hidden sm:h-11 sm:w-11"
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
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-khaki" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
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
                className="block rounded-xl px-3 py-2.5 text-[16px] font-semibold text-ink/85 hover:bg-sageSoft/50"
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
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15.5px] font-bold text-leaf hover:bg-sageSoft/50"
              >
                {link.href.startsWith("/favorites") && link.label === "Избранное" && favoriteCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-extrabold text-paper">
                    {favoriteCount}
                  </span>
                )}
                {link.label}
              </Link>
            ))}
            <div className="mt-3 rounded-2xl border border-line bg-cream px-4 py-3 text-[13px] leading-relaxed text-ink/65">
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
