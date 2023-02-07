import Link from "next/link";
import styles from "./Button.module.css";
const Button = ({ link, children }) => {
  if (link)
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  return <button className={styles.btn}>{children}</button>;
};

export default Button;
