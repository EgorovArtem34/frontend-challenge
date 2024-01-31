import { Cats } from "@/components/Cats/Cats";
import { Header } from "@/components/Header/Header";

export const FavoritesCatsPage = () => {
  return (
    <>
      <Header />
      <main>
        <Cats isShowFavoriteCats={true} />
      </main>
    </>
  );
};
