import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <span className={styles.logoIcon}>⚡</span>
                <span className={styles.logoText}>Task Manager</span>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>
                            Головна
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/task-list" className={styles.navLink}>
                            Завдання
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
