import { AppLink } from "@/ui/AppLink/AppLink";
import styles from "./NavBar.module.scss";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <ul className={styles.links}>
      <li>
        <AppLink
          to="/"
          className={`${styles.headerLink} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          Все котики
        </AppLink>
      </li>
      <li>
        <AppLink
          to="/favorites"
          className={`${styles.headerLink} ${
            pathname === "/favorites" ? styles.active : ""
          }`}
        >
          Любимые котики
        </AppLink>
      </li>
    </ul>
  );
};
