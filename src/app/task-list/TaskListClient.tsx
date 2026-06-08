'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Task as ITask } from "@/components/Task/task.interface";
import { getTasks } from "@/lib/storage";
import Task from "@/components/Task/Task";
import styles from "./page.module.css";

export default function TaskListClient() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadedTasks = getTasks();
        const timer = setTimeout(() => {
            setTasks(loadedTasks);
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded) {
        return (
            <div className={styles.pageContainer}>
                <header className={styles.pageHeader}>
                    <div className={styles.headerInfo}>
                        <h2 className={styles.pageTitle}>Список завдань</h2>
                        <p className={styles.pageSubtitle}>Завантаження...</p>
                    </div>
                </header>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <div className={styles.headerInfo}>
                    <h2 className={styles.pageTitle}>Список завдань</h2>
                    <p className={styles.pageSubtitle}>
                        Всього завдань: <span className={styles.counter}>{tasks.length}</span>
                    </p>
                </div>
                <Link href="/task/new" className={styles.createBtn}>
                    <span>+</span> Створити завдання
                </Link>
            </header>
            
            {tasks.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>У вас немає створених завдань.</p>
                    <Link href="/task/new" className={styles.createBtn}>
                        Створити перше завдання
                    </Link>
                </div>
            ) : (
                <div className={styles.taskGrid}>
                    {tasks.map((task) => {
                        return <Task task={task} key={task.uuid}/>
                    })}
                </div>
            )}
        </div>
    );
}
