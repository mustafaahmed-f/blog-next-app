import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <FaFacebook size={20} />
        <FaInstagram size={20} />
        <FaTiktok size={20} />
        <FaYoutube size={20} />
      </div>
      <Link href="/" className={styles.logo}>
        lamablog
      </Link>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <Link href="/" className={styles.link}>
          About
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
}

export default Header;
