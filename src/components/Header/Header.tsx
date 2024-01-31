import styles from "./Header.module.scss";
import { NavBar } from "../NavBar/NavBar";

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
};
