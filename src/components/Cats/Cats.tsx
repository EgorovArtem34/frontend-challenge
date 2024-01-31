import { useEffect } from "react";
import styles from "./Cats.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchCatsAction, fetchMoreCats } from "@/store/slices/catsSlice";
import { CatItem } from "./CatItem/CatItem";
import { Loader } from "@/ui/Loader/Loader";
import { getFavoritesLocalStorage } from "@/utils/catsHelpers";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { Button } from "@/ui/Button/Button";

interface CatsProps {
  isShowFavoriteCats?: boolean;
}

export const Cats: React.FC<CatsProps> = ({ isShowFavoriteCats = false }) => {
  const dispatch = useAppDispatch();
  const {
    cats,
    isLoadings: { isFetchCatsLoading, isFetchMoreCatsLoading },
    errors: { fetchCatsErr, fetchMoreCatsErr },
  } = useAppSelector((state) => state.catsSlice);
  const isLoading = isFetchCatsLoading || isFetchMoreCatsLoading;
  const currentCats = isShowFavoriteCats ? getFavoritesLocalStorage() : cats;

  useEffect(() => {
    if (cats?.length === 0) {
      dispatch(fetchCatsAction());
    }
  }, [cats, dispatch]);

  const handleMoreCats = () => {
    dispatch(fetchMoreCats());
  };

  return (
    <div className="container">
      {isFetchCatsLoading && !isShowFavoriteCats && <Loader />}
      {fetchCatsErr && !isShowFavoriteCats && (
        <p className="info">Error: {fetchCatsErr}</p>
      )}
      {!isLoading &&
      !fetchCatsErr &&
      !fetchMoreCatsErr &&
      currentCats.length === 0 ? (
        <p className="info">No cats found</p>
      ) : (
        <ul className={styles.cats}>
          {currentCats.map((cat) => (
            <CatItem key={cat.id} cat={cat} />
          ))}
        </ul>
      )}
      {isFetchMoreCatsLoading && (
        <p className={styles.moreFetchInfo}>... загружаем еще котиков ...</p>
      )}
      {!isShowFavoriteCats && (
        <Button
          variant="fetchMore"
          onClick={handleMoreCats}
          disabled={isLoading}
        >
          Позвать котиков
        </Button>
      )}
    </div>
  );
};
