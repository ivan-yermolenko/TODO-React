import { Task } from "@/components/Task/task.interface";

const STORAGE_KEY = "tasks_manager_data";

export function getTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(data) as Task[];
  } catch (e) {
    console.error("Error parsing tasks from localStorage", e);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTaskByUuid(uuid: string): Task | undefined {
  const tasks = getTasks();
  return tasks.find(t => t.uuid === uuid);
}

export function saveTask(task: Task): void {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.uuid === task.uuid);

  if (index !== -1) {
    tasks[index] = task;
  } else {
    tasks.push(task);
  }

  saveTasks(tasks);
}

export function deleteTask(uuid: string): void {
  const tasks = getTasks();
  const filtered = tasks.filter(t => t.uuid !== uuid);
  saveTasks(filtered);
}
