import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>Сторінку не знайдено</h2>
      <p className={styles.message}>
        Вибачте, але запитувана вами сторінка не існує або була переміщена. Перевірте правильність введеної адреси.
      </p>
      <Link href="/" className={styles.homeLink}>
        Повернутися на головну
      </Link>
    </div>
  );
}
