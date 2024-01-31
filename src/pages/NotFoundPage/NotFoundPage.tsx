import styles from "./NotFoundPage.module.scss";
import { AppLink } from "@/ui/AppLink/AppLink";

export const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <span className={styles.text}>404</span>
    <h1 className={styles.title}>Страница не найдена</h1>
    <AppLink to="/" className={styles.link}>
      Обратно к котикам
    </AppLink>
  </div>
);
