import CatalogView from "../../components/catalog/CatalogView";

export const metadata = {
  title: "Каталог товаров PHYTOTAB — фитосборы, грибы, витамины",
  description:
    "Каталог PHYTOTAB: фитосборы, грибы в капсулах и порошках, витамины, наборы по системе Евгения Козлова. Фильтры по разделу, формату и цене, поиск, доставка СДЭК по России.",
};

export default function CatalogPage() {
  return (
    <main id="main">
      <CatalogView />
    </main>
  );
}