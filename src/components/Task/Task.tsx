import { Task as ITask } from "@/components/Task/task.interface";
import styles from "./Task.module.css";

export default function Task({ task }: { task: ITask }) {
    const { title, description, dateTime, reminder, status } = task;

    // Map status to styles
    let statusClass = styles.pending;
    if (status === "виконано") {
        statusClass = styles.completed;
    } else if (status === "архівовано") {
        statusClass = styles.archived;
    }

    const formattedDate = new Date(dateTime).toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={`${styles.taskCard} ${statusClass}`}>
            <header className={styles.cardHeader}>
                <h3 className={styles.taskTitle}>{title}</h3>
                <span className={styles.statusBadge}>{status}</span>
            </header>

            <div className={styles.cardBody}>
                <p className={styles.taskDescription}>{description}</p>

                <div className={styles.taskMeta}>
                    <time className={styles.taskTime} dateTime={dateTime} suppressHydrationWarning>
                        <span className={styles.icon}>📅</span> {formattedDate}
                    </time>

                    {(reminder && statusClass === styles.pending) && (
                        <div className={styles.reminderBadge}>
                            <span className={styles.pulseDot}></span>
                            <span className={styles.icon}>🔔</span> Нагадати
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
