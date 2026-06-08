export type TaskStatus = "виконано" | "не виконано" | "архівовано";

export interface Task {
  id: number;
  uuid: string;
  title: string;
  description: string;
  dateTime: string; // ISO Date String
  reminder: boolean;
  status: TaskStatus;
}
