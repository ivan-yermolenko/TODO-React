'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Task as ITask, TaskStatus } from "@/components/Task/task.interface";
import { saveTask, deleteTask } from "@/lib/storage";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  task?: ITask;
}

export default function TaskForm({ task }: TaskFormProps) {
  const router = useRouter();
  const isEdit = !!task;

  // Helper to format ISO date to YYYY-MM-DDTHH:MM
  const formatDateForInput = (isoString?: string) => {
    const date = isoString ? new Date(isoString) : new Date();
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dateTime, setDateTime] = useState(formatDateForInput(task?.dateTime));
  const [reminder, setReminder] = useState(task?.reminder || false);
  const [status, setStatus] = useState<TaskStatus>(task?.status || "не виконано");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Будь ласка, введіть назву завдання");
      return;
    }

    const taskData: ITask = {
      id: task?.id || Date.now(),
      uuid: task?.uuid || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)),
      title: title.trim(),
      description: description.trim(),
      dateTime: new Date(dateTime).toISOString(),
      reminder,
      status
    };

    saveTask(taskData);
    router.push("/task-list");
    router.refresh();
  };

  const handleDelete = () => {
    if (task && confirm("Ви впевнені, що хочете видалити це завдання?")) {
      deleteTask(task.uuid);
      router.push("/task-list");
      router.refresh();
    }
  };

  const handleCancel = () => {
    router.push("/task-list");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {isEdit ? "Редагувати завдання" : "Нове завдання"}
      </h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Назва завдання *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Наприклад: Купити продукти"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Опис завдання</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Додайте деталі завдання..."
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateTime" className={styles.label}>Дата та час виконання</label>
        <input
          type="datetime-local"
          id="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
        <input
          type="checkbox"
          id="reminder"
          checked={reminder}
          onChange={(e) => setReminder(e.target.checked)}
          className={styles.checkbox}
        />
        <label htmlFor="reminder" className={styles.checkboxLabel}>
          Надіслати нагадування заздалегідь
        </label>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status" className={styles.label}>Статус завдання</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className={styles.select}
        >
          <option value="не виконано">Не виконано</option>
          <option value="виконано">Виконано</option>
          <option value="архівовано">Архівовано</option>
        </select>
      </div>

      <div className={styles.actions}>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            Видалити
          </button>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelBtn}
        >
          Скасувати
        </button>
        <button type="submit" className={styles.submitBtn}>
          {isEdit ? "Зберегти" : "Створити"}
        </button>
      </div>
    </form>
  );
}
