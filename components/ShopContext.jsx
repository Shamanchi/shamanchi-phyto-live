"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cartLines, discountFor, isAvailable, makeOrderNumber, normalizePromo, productById } from "../lib/shop";

const ShopContext = createContext(null);
const CART_KEY = "pt-cart-v1";
const ORDERS_KEY = "pt-orders-v1";
const MAX_QTY = 99;

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* корзина и заказы живут в браузере до подключения бэкенда */
  }
}

export function ShopProvider({ children }) {
  const [items, setItems] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedCart = readJson(CART_KEY);
    if (savedCart && typeof savedCart === "object") setItems(savedCart);
    const savedOrders = readJson(ORDERS_KEY);
    if (Array.isArray(savedOrders)) setOrders(savedOrders);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeJson(CART_KEY, items);
  }, [items, ready]);

  useEffect(() => {
    if (!ready) return;
    writeJson(ORDERS_KEY, orders);
  }, [orders, ready]);

  const add = useCallback((id, qty = 1) => {
    const product = productById(id);
    if (!isAvailable(product)) return;
    setItems((prev) => {
      const current = prev[id] || 0;
      return { ...prev, [id]: Math.min(MAX_QTY, current + qty) };
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: Math.min(MAX_QTY, qty) };
    });
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems({});
    setPromoCode("");
  }, []);

  const lines = useMemo(() => cartLines(items), [items]);

  const promo = useMemo(() => normalizePromo(promoCode), [promoCode]);

  const { count, subtotal } = useMemo(() => {
    let countValue = 0;
    let subtotalValue = 0;
    for (const { product, qty } of lines) {
      countValue += qty;
      subtotalValue += product.price * qty;
    }
    return { count: countValue, subtotal: subtotalValue };
  }, [lines]);

  const discount = useMemo(() => discountFor(subtotal, promo), [subtotal, promo]);
  const total = Math.max(0, subtotal - discount);

  const applyPromo = useCallback((raw) => {
    const code = String(raw || "").trim().toUpperCase();
    const ok = normalizePromo(code);
    setPromoCode(ok ? ok.code : code === "" ? "" : code);
    return Boolean(ok);
  }, []);

  const placeOrder = useCallback(
    (details) => {
      const currentLines = cartLines(items).map(({ product, qty }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
        img: product.img,
      }));
      if (!currentLines.length) return null;
      const order = {
        id: makeOrderNumber(),
        createdAt: new Date().toISOString(),
        lines: currentLines,
        subtotal,
        discount,
        promoCode: promo ? promo.code : null,
        deliveryKey: details.deliveryKey,
        deliveryCost: details.deliveryCost || 0,
        total: total + (details.deliveryCost || 0),
        paymentKey: details.paymentKey,
        contact: {
          name: details.name || "",
          phone: details.phone || "",
          email: details.email || "",
          address: details.address || "",
        },
        status: "Принят · менеджер пришлёт ссылку на оплату",
      };
      setOrders((prev) => [order, ...prev]);
      setItems({});
      setPromoCode("");
      return order;
    },
    [items, subtotal, discount, total, promo]
  );

  // Повтор заказа: добавляет позиции прошлого заказа в корзину (только доступные товары).
  const reorder = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order || !Array.isArray(order.lines) || order.lines.length === 0) return false;
      setItems((prev) => {
        const next = { ...prev };
        for (const line of order.lines) {
          const product = productById(line.id);
          if (!product || !isAvailable(product)) continue;
          const current = next[line.id] || 0;
          next[line.id] = Math.min(MAX_QTY, current + (line.qty || 1));
        }
        return next;
      });
      return true;
    },
    [orders]
  );

  return (
    <ShopContext.Provider
      value={{
        items,
        add,
        setQty,
        remove,
        clear,
        lines,
        count,
        subtotal,
        discount,
        total,
        promoCode,
        applyPromo,
        promo,
        placeOrder,
        reorder,
        orders,
        ready,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop должен использоваться внутри ShopProvider");
  return ctx;
}