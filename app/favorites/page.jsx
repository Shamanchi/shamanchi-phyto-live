import FavoritesPage from "../../components/favorites/FavoritesPage";

export const metadata = {
  title: "Избранное — PHYTOTAB",
  description: "Сохранённые товары PHYTOTAB: фитосборы, грибы, витамины и наборы, отложенные в личный список.",
  robots: { index: false, follow: false },
};

export default function FavoritesPageRoute() {
  return (
    <main id="main">
      <FavoritesPage />
    </main>
  );
}
