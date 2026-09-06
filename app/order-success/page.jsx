import { Suspense } from "react";
import OrderSuccessClient from "../../components/checkout/OrderSuccessClient";

export const metadata = {
  title: "Заказ принят",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <main id="main">
      <Suspense fallback={null}>
        <OrderSuccessClient />
      </Suspense>
    </main>
  );
}