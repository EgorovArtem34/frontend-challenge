import { useEffect } from "react";
import styles from "./Cats.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchCatsAction } from "@/store/slices/catsSlice";
import { CatItem } from "./CatItem/CatItem";
import { Loader } from "@/ui/Loader/Loader";

export const Cats = () => {
  const dispatch = useAppDispatch();
  const {
    cats,
    isLoadings: { isFetchCatsLoading, isFetchMoreCatsLoading },
    errors: { fetchCatsErr, fetchMoreCatsErr },
  } = useAppSelector((state) => state.catsSlice);
  const isLoading = isFetchCatsLoading || isFetchMoreCatsLoading;

  useEffect(() => {
    if (cats?.length === 0) {
      dispatch(fetchCatsAction());
    }
  }, [cats, dispatch]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {fetchCatsErr && <p className="center">Error: {fetchCatsErr}</p>}
      {!isLoading && !fetchCatsErr && !fetchMoreCatsErr && cats.length === 0 ? (
        <p className="center">No cats found</p>
      ) : (
        <ul className={styles.cats}>
          {cats.map((cat) => (
            <CatItem key={cat.id} cat={cat} />
          ))}
        </ul>
      )}
    </div>
  );
};
