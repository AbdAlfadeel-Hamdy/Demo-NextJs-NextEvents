import Link from "next/link";
import styles from "./Button.module.css";
const Button = ({ link, children }) => {
  return (
    <Link href={link} className={styles.btn}>
      {children}
    </Link>
  );
};

export default Button;
