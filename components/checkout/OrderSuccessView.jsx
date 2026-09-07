"use client";

import Link from "next/link";
import { useShop } from "../ShopContext";
import { formatPrice, SHOP, SHOP_TG_URL } from "../../lib/site";
import { deliveryOption } from "../../lib/shop";
import TgChannelCard from "../home/TgChannelCard";

export default function OrderSuccessView({ id }) {
  const { orders, ready } = useShop();
  const order = orders.find((o) => o.id === id) || (ready ? orders[0] : null);

  if (!ready) {
    return (
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-20 text-center">
          <p className="font-display text-2xl">Ищем ваш заказ…</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-16 sm:pt-[72px]">
        <div className="wrap py-20 text-center">
          <h1 className="font-display text-4xl font-semibold">Заказ не найден</h1>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink/90">
            В этом браузере нет сохранённого заказа. Оформите новый — это займёт пару минут.
          </p>
          <Link
            href="/catalog/"
            className="mt-8 inline-flex rounded-full bg-honey px-7 py-3.5 text-lg font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
          >
            В каталог
          </Link>
        </div>
      </div>
    );
  }

  const delivery = deliveryOption(order.deliveryKey);
  const date = new Date(order.createdAt).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="pt-16 sm:pt-[72px]">
      <div className="wrap py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-line bg-cream p-6 text-center shadow-lift sm:p-10">
            <span className="mx-auto grid h-24 w-24 place-items-center">
              <svg viewBox="0 0 24 24" className="h-20 w-20" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#207D44" />
                <path d="M7.4 12.4 10.7 15.7 16.6 9.4" stroke="#FBF8F1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="19.8" cy="5.4" r="2.1" fill="#E8963A" />
              </svg>
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">
              Заказ принят
            </h1>
            <p className="mt-3 text-[16px] text-ink/90">
              Номер заказа: <span className="font-extrabold text-honeyDark">{order.id}</span>
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-secondary">
              Менеджер подтвердит заказ и пришлёт ссылку на оплату картой или СБП.
              После оплаты заказ отправим СДЭК в течение 1–2 рабочих дней и пришлём трек-номер.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={`${SHOP_TG_URL}?text=${encodeURIComponent(`Здравствуйте! Вопрос по заказу ${order.id}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-6 py-3 text-[15px] font-extrabold text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-honeyDark"
              >
                Задать вопрос в телеграм PHYTOTAB
              </a>
              <Link
                href="/account/"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-[15px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
              >
                Мои заказы
              </Link>
              <Link
                href="/catalog/"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-[15px] font-bold text-ink/90 transition hover:border-leaf hover:text-leaf"
              >
                В каталог
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <TgChannelCard dark />
          </div>

          <div className="mt-6 rounded-3xl border border-line bg-cream p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold">Состав заказа</h2>
              <p className="font-mono text-[11px] uppercase tracking-wider text-khaki">{date}</p>
            </div>
            <ul className="mt-5 space-y-3">
              {order.lines.map((line) => (
                <li key={line.id} className="flex items-center justify-between gap-3 border-b border-line pb-3 text-[15px] last:border-0 last:pb-0">
                  <span>
                    <Link href={`/product/${line.id}/`} className="font-bold transition hover:text-leaf">
                      {line.name}
                    </Link>
                    <span className="ml-2 text-[12.5px] text-khaki">× {line.qty}</span>
                  </span>
                  <span className="font-extrabold">{formatPrice(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[14.5px]">
              {order.discount > 0 && (
                <div className="flex justify-between text-leaf">
                  <dt>Промокод {order.promoCode || ""}</dt>
                  <dd>−{formatPrice(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-secondary">{delivery ? delivery.label : "Доставка"}</dt>
                <dd className="font-bold">{order.deliveryCost === 0 ? "Бесплатно" : formatPrice(order.deliveryCost)}</dd>
              </div>
              <div className="flex justify-between text-[17px]">
                <dt className="font-extrabold">Итого</dt>
                <dd className="font-extrabold text-honeyDark">{formatPrice(order.total)}</dd>
              </div>
            </dl>
            <p className="mt-5 rounded-xl bg-paper/80 p-3.5 font-mono text-[11px] leading-relaxed text-secondary">
              Заказ сохранён в «Моих заказах» этого браузера. Статус: {order.status}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}