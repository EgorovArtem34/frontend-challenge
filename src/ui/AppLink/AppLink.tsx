import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";
import styles from "./AppLink.module.scss";
import { classNames } from "@/utils/classNames";

interface AppLinkProps extends LinkProps {
  className?: string;
  isActive?: boolean;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, children, className = "", ...otherProps } = props;

  return (
    <Link
      to={to}
      className={classNames(styles.link, {}, [className])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
