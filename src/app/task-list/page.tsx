import type { Metadata } from "next";
import { Task as ITask } from "@/components/Task/task.interface";
import MockTasks from "./../../../public/tasks.json"
import Task from "@/components/Task/Task";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Список завдань",
  description: "Ваш персональний список завдань та нагадувань",
};

export default function TaskList() {
    // TODO stateGetTasks

    const tasks = MockTasks as unknown as ITask[];

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Список завдань</h2>
                <p className={styles.pageSubtitle}>
                    Всього завдань: <span className={styles.counter}>{tasks.length}</span>
                </p>
            </header>
            
            <div className={styles.taskGrid}>
                {tasks.map((task) => {
                    return <Task task={task} key={task.id}/>
                })}
            </div>
        </div>
    );
}
