'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Caught global page error:", error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h2 className={styles.title}>Щось пішло не так!</h2>
      <p className={styles.message}>
        Сталася помилка при завантаженні або рендерингу цієї сторінки. Спробуйте оновити дані або повернутися на головну.
      </p>
      <div className={styles.actions}>
        <button onClick={() => reset()} className={styles.retryBtn}>
          Спробувати знову
        </button>
        <Link href="/" className={styles.homeLink}>
          На головну
        </Link>
      </div>
    </div>
  );
}
