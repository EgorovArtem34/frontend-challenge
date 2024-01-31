import { AppLink } from "@/ui/AppLink/AppLink";
import styles from "./NavBar.module.scss";
import { useLocation } from "react-router-dom";
import { classNames } from "@/utils/classNames";

export const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <ul className={styles.links}>
      <li>
        <AppLink
          to="/"
          className={classNames(styles.headerLink, {
            [styles.active]: pathname === "/",
          })}
        >
          Все котики
        </AppLink>
      </li>
      <li>
        <AppLink
          to="/favorites"
          className={classNames(styles.headerLink, {
            [styles.active]: pathname === "/favorites",
            [styles.large]: true,
          })}
        >
          Любимые котики
        </AppLink>
      </li>
    </ul>
  );
};
