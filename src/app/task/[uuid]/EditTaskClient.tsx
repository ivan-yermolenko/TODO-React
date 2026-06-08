'use client';

import { useEffect, useState } from "react";
import { Task as ITask } from "@/components/Task/task.interface";
import { getTaskByUuid } from "@/lib/storage";
import TaskForm from "@/components/TaskForm/TaskForm";
import Link from "next/link";
import styles from "./EditTask.module.css";

export default function EditTaskClient({ uuid }: { uuid: string }) {
  const [task, setTask] = useState<ITask | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const foundTask = getTaskByUuid(uuid);
    const timer = setTimeout(() => {
      setTask(foundTask || null);
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [uuid]);

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        Завантаження завдання...
      </div>
    );
  }

  if (!task) {
    return (
      <div className={styles.notFoundContainer}>
        <h2 className={styles.notFoundTitle}>Завдання не знайдено</h2>
        <p className={styles.notFoundText}>Завдання з таким ідентифікатором не існує або було видалено.</p>
        <Link href="/task-list" className={styles.backLink}>
          Назад до списку
        </Link>
      </div>
    );
  }

  return <TaskForm task={task} />;
}
