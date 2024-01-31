import { ICat, IFavoriteParams } from "../store/types/index";

export const getFavoritesLocalStorage = (): ICat[] =>
  JSON.parse(localStorage.getItem("favorites") ?? "[]");

export const setFavoriteLocalStorage = ({
  id,
  url,
  isFavorite,
}: IFavoriteParams) => {
  const favoritesLocalStorage = getFavoritesLocalStorage();

  const updatedFavorites = isFavorite
    ? [...favoritesLocalStorage, { id, url, isFavorite }]
    : favoritesLocalStorage.filter(
        ({ id: favoriteId }: { id: string }) => favoriteId !== id
      );

  if (updatedFavorites.length === 0) {
    localStorage.removeItem("favorites");
  } else {
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
};

export const modifyCats = (cats: ICat[]) => {
  const favoritesCatsLocalStorage = getFavoritesLocalStorage();
  const favoriteCatIds = favoritesCatsLocalStorage.map((el) => el.id);

  return cats.map((cat) => {
    const isFavoriteCat = favoriteCatIds.includes(cat.id);
    return { ...cat, isFavorite: isFavoriteCat };
  });
};
