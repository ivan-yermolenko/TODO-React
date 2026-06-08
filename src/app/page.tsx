import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroGlow}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Керуйте своїми справами <span className={styles.gradientText}>ефективно</span>
        </h1>
        <p className={styles.description}>
          Сучасний та зручний менеджер завдань, що допоможе вам організувати свій день, підвищити продуктивність та не забути про важливі події.
        </p>
        <div className={styles.actions}>
          <Link href="/task-list" className={styles.primaryBtn}>
            Переглянути завдання <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
