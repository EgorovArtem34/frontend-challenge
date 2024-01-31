import { useEffect } from "react";
import styles from "./Cats.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchCatsAction } from "@/store/slices/catsSlice";
import { CatItem } from "./CatItem/CatItem";

export const Cats = () => {
  const dispatch = useAppDispatch();
  const { cats } = useAppSelector((state) => state.catsSlice);

  useEffect(() => {
    if (cats?.length === 0) {
      dispatch(fetchCatsAction());
    }
  }, [cats, dispatch]);

  return (
    <div>
      <ul className={styles.cats}>
        {cats.map((cat) => (
          <CatItem key={cat.id} cat={cat} />
        ))}
      </ul>
    </div>
  );
};
